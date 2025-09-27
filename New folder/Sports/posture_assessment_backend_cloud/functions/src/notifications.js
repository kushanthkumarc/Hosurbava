const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

// Notify coaches when new assessment is created
exports.notifyCoachNewAssessment = functions.firestore
  .document('assessments/{assessmentId}')
  .onCreate(async (snap, context) => {
    const assessmentId = context.params.assessmentId;
    const assessmentData = snap.data();
    
    try {
      console.log('Sending new assessment notification for:', assessmentId);
      
      // Get all active coaches
      const coachesSnapshot = await db.collection('users')
        .where('role', '==', 'coach')
        .where('isActive', '==', true)
        .where('preferences.emailNotifications', '==', true)
        .get();
      
      if (coachesSnapshot.empty) {
        console.log('No coaches found to notify');
        return null;
      }
      
      const notifications = [];
      const athlete = assessmentData.athleteDetails;
      
      coachesSnapshot.forEach(doc => {
        const coach = doc.data();
        
        notifications.push({
          recipientId: doc.id,
          type: 'new_assessment',
          title: 'New Assessment Available',
          message: `${athlete.name} (${athlete.sportType}, Age: ${athlete.age}) has completed a posture assessment`,
          isRead: false,
          priority: 'normal',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          data: {
            assessmentId: assessmentId,
            athleteName: athlete.name,
            sportType: athlete.sportType,
            athleteAge: athlete.age,
            assessorId: assessmentData.assessorId,
            action: 'view_assessment'
          }
        });
      });
      
      // Batch write notifications
      const batch = db.batch();
      notifications.forEach(notification => {
        const notificationRef = db.collection('notifications').doc();
        batch.set(notificationRef, notification);
      });
      
      await batch.commit();
      
      console.log(`Sent ${notifications.length} notifications for new assessment`);
      return null;
    } catch (error) {
      console.error('Error sending new assessment notifications:', error);
      throw error;
    }
  });

// Send daily summary to coaches
exports.sendDailyReportSummary = functions.pubsub.schedule('0 9 * * *').onRun(async (context) => {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  
  try {
    console.log('Generating daily report summary...');
    
    // Get yesterday's assessments
    const assessmentsSnapshot = await db.collection('assessments')
      .where('assessmentDate', '>=', yesterday)
      .where('assessmentDate', '<', today)
      .get();
    
    if (assessmentsSnapshot.empty) {
      console.log('No assessments from yesterday to report');
      return null;
    }
    
    // Generate summary statistics
    let totalAssessments = 0;
    let completedAssessments = 0;
    let averageScore = 0;
    const sportBreakdown = {};
    const assessorStats = {};
    
    assessmentsSnapshot.forEach(doc => {
      const data = doc.data();
      totalAssessments++;
      
      if (data.status === 'completed') {
        completedAssessments++;
        averageScore += data.postureAnalysis.overallPostureScore;
      }
      
      // Sport breakdown
      const sport = data.athleteDetails.sportType;
      sportBreakdown[sport] = (sportBreakdown[sport] || 0) + 1;
      
      // Assessor stats
      const assessorId = data.assessorId;
      if (!assessorStats[assessorId]) {
        assessorStats[assessorId] = { count: 0, assessorEmail: data.assessorEmail || 'Unknown' };
      }
      assessorStats[assessorId].count++;
    });
    
    if (completedAssessments > 0) {
      averageScore = averageScore / completedAssessments;
    }
    
    // Get active coaches for summary
    const coachesSnapshot = await db.collection('users')
      .where('role', '==', 'coach')
      .where('isActive', '==', true)
      .where('preferences.emailNotifications', '==', true)
      .get();
    
    if (coachesSnapshot.empty) {
      console.log('No coaches to send daily summary to');
      return null;
    }
    
    // Create summary message
    const summaryMessage = `Daily Assessment Summary: ${totalAssessments} assessments completed (${completedAssessments} verified). Average score: ${averageScore.toFixed(1)}. Top sports: ${Object.keys(sportBreakdown).slice(0, 3).join(', ')}.`;
    
    const notifications = [];
    coachesSnapshot.forEach(doc => {
      notifications.push({
        recipientId: doc.id,
        type: 'daily_summary',
        title: 'Daily Assessment Summary',
        message: summaryMessage,
        isRead: false,
        priority: 'low',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        data: {
          date: yesterday.toISOString().split('T')[0],
          totalAssessments,
          completedAssessments,
          averageScore: parseFloat(averageScore.toFixed(1)),
          sportBreakdown,
          assessorStats,
          action: 'view_dashboard'
        }
      });
    });
    
    // Store daily summary for historical tracking
    await db.collection('daily_summaries').doc(yesterday.toISOString().split('T')[0]).set({
      date: yesterday,
      totalAssessments,
      completedAssessments,
      averageScore: parseFloat(averageScore.toFixed(1)),
      sportBreakdown,
      assessorStats,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Batch write notifications
    const batch = db.batch();
    notifications.forEach(notification => {
      const notificationRef = db.collection('notifications').doc();
      batch.set(notificationRef, notification);
    });
    
    await batch.commit();
    
    console.log(`Daily summary sent to ${notifications.length} coaches`);
    return null;
  } catch (error) {
    console.error('Error sending daily summary:', error);
    throw error;
  }
});

// Clean up expired notifications
exports.cleanupExpiredNotifications = functions.pubsub.schedule('0 1 * * *').onRun(async (context) => {
  const now = new Date();
  
  try {
    console.log('Cleaning up expired notifications...');
    
    const expiredNotifications = await db.collection('notifications')
      .where('expiresAt', '<=', now)
      .get();
    
    if (expiredNotifications.empty) {
      console.log('No expired notifications to clean up');
      return null;
    }
    
    const batch = db.batch();
    expiredNotifications.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    
    console.log(`Cleaned up ${expiredNotifications.size} expired notifications`);
    return null;
  } catch (error) {
    console.error('Error cleaning up notifications:', error);
    throw error;
  }
});

// Mark notification as read
exports.markNotificationRead = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { notificationId } = data;
  
  if (!notificationId) {
    throw new functions.https.HttpsError('invalid-argument', 'notificationId is required');
  }
  
  try {
    const notificationRef = db.collection('notifications').doc(notificationId);
    const notificationDoc = await notificationRef.get();
    
    if (!notificationDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Notification not found');
    }
    
    const notificationData = notificationDoc.data();
    
    // Verify the user owns this notification
    if (notificationData.recipientId !== context.auth.uid) {
      throw new functions.https.HttpsError('permission-denied', 'Not authorized to access this notification');
    }
    
    await notificationRef.update({
      isRead: true,
      readAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Get unread notification count
exports.getUnreadNotificationCount = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  try {
    const unreadSnapshot = await db.collection('notifications')
      .where('recipientId', '==', context.auth.uid)
      .where('isRead', '==', false)
      .get();
    
    return { count: unreadSnapshot.size };
  } catch (error) {
    console.error('Error getting unread notification count:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Send push notification (placeholder for FCM integration)
async function sendPushNotification(userId, title, body, data) {
  // This would integrate with Firebase Cloud Messaging
  // to send actual push notifications to mobile devices
  console.log('Push notification would be sent:', { userId, title, body, data });
  
  // Example FCM implementation:
  // const userTokensSnapshot = await db.collection('user_tokens')
  //   .where('userId', '==', userId)
  //   .get();
  // 
  // const tokens = [];
  // userTokensSnapshot.forEach(doc => {
  //   tokens.push(doc.data().token);
  // });
  // 
  // if (tokens.length > 0) {
  //   const message = {
  //     notification: { title, body },
  //     data: data,
  //     tokens: tokens
  //   };
  //   
  //   await admin.messaging().sendMulticast(message);
  // }
}

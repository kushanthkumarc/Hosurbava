const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Process uploaded assessment videos
exports.processVideoUpload = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const contentType = object.contentType;
  
  // Only process videos in assessment-videos folder
  if (!filePath.startsWith('assessment-videos/') || !contentType.startsWith('video/')) {
    console.log('Ignoring non-assessment video file:', filePath);
    return null;
  }
  
  try {
    const pathParts = filePath.split('/');
    const assessmentId = pathParts[1];
    const fileName = pathParts[2];
    
    console.log('Processing video upload for assessment:', assessmentId);
    
    // Update assessment document with video information
    const assessmentRef = db.collection('assessments').doc(assessmentId);
    const assessmentDoc = await assessmentRef.get();
    
    if (!assessmentDoc.exists) {
      console.error('Assessment not found:', assessmentId);
      return null;
    }
    
    await assessmentRef.update({
      videoPath: filePath,
      videoFileName: fileName,
      videoSize: parseInt(object.size),
      videoUploadedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'completed', // Mark as completed once video is uploaded
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Create notification for coaches about new assessment
    const coachesSnapshot = await db.collection('users')
      .where('role', '==', 'coach')
      .where('isActive', '==', true)
      .get();
    
    const assessmentData = assessmentDoc.data();
    const notifications = [];
    
    coachesSnapshot.forEach(doc => {
      notifications.push({
        recipientId: doc.id,
        type: 'new_assessment',
        title: 'New Assessment Ready for Review',
        message: `Assessment for ${assessmentData.athleteDetails.name} (${assessmentData.athleteDetails.sportType}) is ready for verification`,
        isRead: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        data: {
          assessmentId: assessmentId,
          athleteName: assessmentData.athleteDetails.name,
          sportType: assessmentData.athleteDetails.sportType,
          score: assessmentData.postureAnalysis.overallPostureScore
        }
      });
    });
    
    // Batch write notifications
    if (notifications.length > 0) {
      const batch = db.batch();
      notifications.forEach(notification => {
        const notificationRef = db.collection('notifications').doc();
        batch.set(notificationRef, notification);
      });
      await batch.commit();
    }
    
    // Log video processing
    await db.collection('audit_logs').add({
      action: 'video_processed',
      assessmentId: assessmentId,
      videoPath: filePath,
      videoSize: parseInt(object.size),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('Video processing completed for assessment:', assessmentId);
    return null;
  } catch (error) {
    console.error('Error processing video upload:', error);
    throw error;
  }
});

// Generate assessment report summary
exports.generateReportSummary = functions.firestore
  .document('assessments/{assessmentId}')
  .onWrite(async (change, context) => {
    const assessmentId = context.params.assessmentId;
    
    // Only process completed assessments
    if (!change.after.exists) {
      return null;
    }
    
    const assessmentData = change.after.data();
    if (assessmentData.status !== 'completed') {
      return null;
    }
    
    try {
      console.log('Generating report summary for assessment:', assessmentId);
      
      const posture = assessmentData.postureAnalysis;
      const athlete = assessmentData.athleteDetails;
      
      // Generate summary statistics
      const summary = {
        assessmentId: assessmentId,
        athleteName: athlete.name,
        sportType: athlete.sportType,
        assessmentDate: assessmentData.assessmentDate,
        overallScore: posture.overallPostureScore,
        scoreCategory: getScoreCategory(posture.overallPostureScore),
        keyFindings: generateKeyFindings(posture),
        recommendations: generateRecommendations(posture),
        riskLevel: calculateRiskLevel(posture),
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      // Store summary in separate collection for quick access
      await db.collection('assessment_summaries').doc(assessmentId).set(summary);
      
      // Update assessor's statistics
      await updateAssessorStats(assessmentData.assessorId);
      
      // Update sport-specific analytics
      await updateSportAnalytics(athlete.sportType, posture.overallPostureScore);
      
      console.log('Report summary generated successfully for:', assessmentId);
      return null;
    } catch (error) {
      console.error('Error generating report summary:', error);
      throw error;
    }
  });

// Scheduled function to cleanup expired videos
exports.cleanupExpiredVideos = functions.pubsub.schedule('0 3 * * *').onRun(async (context) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  
  try {
    console.log('Starting cleanup of expired videos...');
    
    const expiredAssessments = await db.collection('assessments')
      .where('assessmentDate', '<', thirtyDaysAgo)
      .where('videoPath', '!=', null)
      .get();
    
    const deletePromises = [];
    
    expiredAssessments.forEach(doc => {
      const data = doc.data();
      if (data.videoPath) {
        deletePromises.push(
          bucket.file(data.videoPath).delete().catch(error => {
            console.error('Error deleting video:', data.videoPath, error);
          })
        );
        
        // Remove video path from assessment document
        deletePromises.push(
          doc.ref.update({
            videoPath: admin.firestore.FieldValue.delete(),
            videoFileName: admin.firestore.FieldValue.delete(),
            videoSize: admin.firestore.FieldValue.delete(),
            videoDeletedAt: admin.firestore.FieldValue.serverTimestamp()
          })
        );
      }
    });
    
    await Promise.all(deletePromises);
    
    console.log(`Cleanup completed. Processed ${expiredAssessments.size} expired videos.`);
    return null;
  } catch (error) {
    console.error('Error during video cleanup:', error);
    throw error;
  }
});

// Helper functions
function getScoreCategory(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Fair';
  if (score >= 60) return 'Poor';
  return 'Very Poor';
}

function generateKeyFindings(posture) {
  const findings = [];
  
  if (posture.shoulderSymmetry < 70) {
    findings.push('Significant shoulder asymmetry detected');
  }
  if (posture.hipAlignment < 70) {
    findings.push('Hip alignment issues identified');
  }
  if (posture.spinalCurvature < 70) {
    findings.push('Abnormal spinal curvature observed');
  }
  if (posture.forwardHeadPosture < 70) {
    findings.push('Forward head posture present');
  }
  
  if (findings.length === 0) {
    findings.push('Generally good posture alignment');
  }
  
  return findings;
}

function generateRecommendations(posture) {
  const recommendations = [];
  
  if (posture.shoulderSymmetry < 80) {
    recommendations.push('Focus on shoulder blade strengthening exercises');
  }
  if (posture.hipAlignment < 80) {
    recommendations.push('Incorporate hip flexibility and strengthening routines');
  }
  if (posture.spinalCurvature < 80) {
    recommendations.push('Work on core stability and spinal mobilization');
  }
  if (posture.forwardHeadPosture < 80) {
    recommendations.push('Practice neck strengthening and posture awareness exercises');
  }
  
  return recommendations;
}

function calculateRiskLevel(posture) {
  const avgScore = (
    posture.shoulderSymmetry +
    posture.hipAlignment +
    posture.spinalCurvature +
    posture.headTilt +
    posture.forwardHeadPosture
  ) / 5;
  
  if (avgScore >= 85) return 'Low';
  if (avgScore >= 70) return 'Moderate';
  return 'High';
}

async function updateAssessorStats(assessorId) {
  const assessorRef = db.collection('users').doc(assessorId);
  
  await assessorRef.update({
    assessmentCount: admin.firestore.FieldValue.increment(1),
    lastAssessmentAt: admin.firestore.FieldValue.serverTimestamp()
  });
}

async function updateSportAnalytics(sportType, score) {
  const analyticsRef = db.collection('sport_analytics').doc(sportType);
  
  await analyticsRef.set({
    totalAssessments: admin.firestore.FieldValue.increment(1),
    totalScore: admin.firestore.FieldValue.increment(score),
    lastUpdated: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
}

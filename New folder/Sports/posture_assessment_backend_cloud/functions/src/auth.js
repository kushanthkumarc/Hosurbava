const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

// Trigger when a new user is created
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  try {
    console.log('New user created:', user.uid);
    
    // Create user profile document
    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      role: 'assessor', // Default role, can be changed by admin
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLoginAt: admin.firestore.FieldValue.serverTimestamp(),
      assessmentCount: 0,
      preferences: {
        emailNotifications: true,
        pushNotifications: true,
        theme: 'system'
      }
    };
    
    await db.collection('users').doc(user.uid).set(userProfile);
    
    // Create welcome notification for coaches
    const coachesSnapshot = await db.collection('users')
      .where('role', '==', 'coach')
      .where('isActive', '==', true)
      .get();
    
    const notifications = [];
    coachesSnapshot.forEach(doc => {
      notifications.push({
        recipientId: doc.id,
        type: 'new_user',
        title: 'New Assessor Joined',
        message: `${user.email} has joined as a new assessor`,
        isRead: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        data: {
          userId: user.uid,
          userEmail: user.email
        }
      });
    });
    
    // Batch write notifications
    if (notifications.length > 0) {
      const batch = db.batch();
      notifications.forEach((notification, index) => {
        const notificationRef = db.collection('notifications').doc();
        batch.set(notificationRef, notification);
      });
      await batch.commit();
    }
    
    // Log user creation for analytics
    await db.collection('audit_logs').add({
      action: 'user_created',
      userId: user.uid,
      userEmail: user.email,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      metadata: {
        provider: user.providerData[0]?.providerId || 'password',
        emailVerified: user.emailVerified
      }
    });
    
    console.log('User profile created successfully for:', user.uid);
    return null;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
});

// Trigger when a user is deleted
exports.onUserDelete = functions.auth.user().onDelete(async (user) => {
  try {
    console.log('User deleted:', user.uid);
    
    const batch = db.batch();
    
    // Delete user profile
    const userRef = db.collection('users').doc(user.uid);
    batch.delete(userRef);
    
    // Anonymize user's assessments (don't delete them for data integrity)
    const assessmentsSnapshot = await db.collection('assessments')
      .where('assessorId', '==', user.uid)
      .get();
    
    assessmentsSnapshot.forEach(doc => {
      batch.update(doc.ref, {
        assessorId: 'deleted_user',
        assessorEmail: 'deleted@example.com',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });
    
    // Delete user's notifications
    const notificationsSnapshot = await db.collection('notifications')
      .where('recipientId', '==', user.uid)
      .get();
    
    notificationsSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    // Delete user sessions
    const sessionsSnapshot = await db.collection('user_sessions')
      .where('userId', '==', user.uid)
      .get();
    
    sessionsSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    
    // Log user deletion for analytics
    await db.collection('audit_logs').add({
      action: 'user_deleted',
      userId: user.uid,
      userEmail: user.email,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      metadata: {
        assessmentsCount: assessmentsSnapshot.size,
        notificationsCount: notificationsSnapshot.size
      }
    });
    
    console.log('User data cleanup completed for:', user.uid);
    return null;
  } catch (error) {
    console.error('Error during user deletion cleanup:', error);
    throw error;
  }
});

// Custom claim setter for role management
exports.setUserRole = functions.https.onCall(async (data, context) => {
  // Verify the user is authenticated and is an admin
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  try {
    // Check if requesting user is admin
    const requestingUserDoc = await db.collection('users').doc(context.auth.uid).get();
    if (!requestingUserDoc.exists || requestingUserDoc.data().role !== 'admin') {
      throw new functions.https.HttpsError('permission-denied', 'Only admins can set user roles');
    }
    
    const { uid, role } = data;
    
    if (!uid || !role) {
      throw new functions.https.HttpsError('invalid-argument', 'uid and role are required');
    }
    
    if (!['assessor', 'coach', 'admin'].includes(role)) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid role specified');
    }
    
    // Set custom claims
    await admin.auth().setCustomUserClaims(uid, { role });
    
    // Update user document
    await db.collection('users').doc(uid).update({
      role: role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedBy: context.auth.uid
    });
    
    // Log role change
    await db.collection('audit_logs').add({
      action: 'role_changed',
      userId: uid,
      performedBy: context.auth.uid,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      metadata: {
        newRole: role,
        previousRole: requestingUserDoc.data().role
      }
    });
    
    return { success: true, message: `Role updated to ${role}` };
  } catch (error) {
    console.error('Error setting user role:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

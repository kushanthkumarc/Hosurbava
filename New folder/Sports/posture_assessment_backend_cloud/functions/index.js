const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Import configuration
const config = require('./src/config');

// Initialize Firebase Admin SDK with configuration
admin.initializeApp({
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  databaseURL: config.firebase.databaseURL
});

// Import function modules
const authFunctions = require('./src/auth');
const assessmentFunctions = require('./src/assessments');
const notificationFunctions = require('./src/notifications');

// Export all Cloud Functions
module.exports = {
  // Authentication Functions
  onUserCreate: authFunctions.onUserCreate,
  onUserDelete: authFunctions.onUserDelete,
  
  // Assessment Processing Functions
  processVideoUpload: assessmentFunctions.processVideoUpload,
  generateReportSummary: assessmentFunctions.generateReportSummary,
  cleanupExpiredVideos: assessmentFunctions.cleanupExpiredVideos,
  
  // Notification Functions
  notifyCoachNewAssessment: notificationFunctions.notifyCoachNewAssessment,
  sendDailyReportSummary: notificationFunctions.sendDailyReportSummary,
  
  // Utility Functions
  healthCheck: functions.https.onRequest((req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }),
  
  // Analytics Function
  generateAnalyticsReport: functions.pubsub.schedule('0 2 * * *').onRun(async (context) => {
    const db = admin.firestore();
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    
    try {
      // Get daily statistics
      const assessmentsSnapshot = await db.collection('assessments')
        .where('assessmentDate', '>=', yesterday)
        .where('assessmentDate', '<', today)
        .get();
      
      const stats = {
        date: yesterday.toISOString().split('T')[0],
        totalAssessments: assessmentsSnapshot.size,
        assessmentsByStatus: {},
        assessmentsBySport: {},
        averageScore: 0
      };
      
      let totalScore = 0;
      assessmentsSnapshot.forEach(doc => {
        const data = doc.data();
        
        // Count by status
        stats.assessmentsByStatus[data.status] = 
          (stats.assessmentsByStatus[data.status] || 0) + 1;
        
        // Count by sport
        const sport = data.athleteDetails?.sportType || 'Unknown';
        stats.assessmentsBySport[sport] = 
          (stats.assessmentsBySport[sport] || 0) + 1;
        
        // Sum scores
        totalScore += data.postureAnalysis?.overallPostureScore || 0;
      });
      
      if (assessmentsSnapshot.size > 0) {
        stats.averageScore = totalScore / assessmentsSnapshot.size;
      }
      
      // Store analytics data
      await db.collection('analytics').doc(stats.date).set(stats);
      
      console.log('Daily analytics report generated:', stats);
      return null;
    } catch (error) {
      console.error('Error generating analytics report:', error);
      throw error;
    }
  })
};

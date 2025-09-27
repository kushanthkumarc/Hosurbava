// Test script to show where your data is stored
const admin = require('firebase-admin');

console.log('🧪 TESTING DATA STORAGE LOCATION...\n');

// Initialize Firebase Admin for LOCAL emulators
admin.initializeApp({
  projectId: 'sports-posture-assessment-2025',
  databaseURL: 'http://127.0.0.1:8080'
});

const db = admin.firestore();

// Connect to LOCAL emulator
db.settings({
  host: '127.0.0.1:8080',
  ssl: false
});

async function testDataLocation() {
  try {
    console.log('📍 CURRENT SETUP: Using LOCAL Firebase Emulators');
    console.log('💾 Data Storage: YOUR COMPUTER (not Google Cloud)');
    console.log('🌐 Location: E:\\project\\New folder\\Sports\\posture_assessment_backend_cloud\n');
    
    // Add test data
    console.log('1️⃣ Adding test data to LOCAL database...');
    const testDoc = await db.collection('test_data_location').add({
      message: 'This data is stored LOCALLY on your computer',
      timestamp: new Date(),
      storage_type: 'LOCAL_EMULATOR',
      computer_path: 'E:\\project\\New folder\\Sports\\posture_assessment_backend_cloud',
      cloud_storage: false,
      google_servers: false
    });
    
    console.log('✅ Test data added with ID:', testDoc.id);
    
    // Retrieve and verify
    console.log('\n2️⃣ Retrieving data from LOCAL database...');
    const snapshot = await db.collection('test_data_location').get();
    
    console.log(`📊 Found ${snapshot.size} document(s) in LOCAL database`);
    
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('\n📄 Document contents:');
      console.log(`   Message: ${data.message}`);
      console.log(`   Storage Type: ${data.storage_type}`);
      console.log(`   Local Path: ${data.computer_path}`);
      console.log(`   In Google Cloud: ${data.cloud_storage}`);
    });
    
    console.log('\n🔍 HOW TO VERIFY THIS:');
    console.log('1. Open http://127.0.0.1:4000/ in your browser');
    console.log('2. Go to Firestore tab');
    console.log('3. Look for "test_data_location" collection');
    console.log('4. This data exists ONLY on your computer!');
    
    console.log('\n💡 TO STORE IN GOOGLE CLOUD INSTEAD:');
    console.log('1. Remove emulator settings from your Flutter app');
    console.log('2. Configure real Firebase project credentials');
    console.log('3. Data will then go to Google servers');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure Firebase emulators are running first!');
    console.log('Run: start-emulators.bat');
  }
}

testDataLocation();

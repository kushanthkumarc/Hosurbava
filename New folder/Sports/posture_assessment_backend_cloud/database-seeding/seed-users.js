// Database seeding script for Sports Posture Assessment System
// Run this script to create initial users and sample data

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./service-account-key.json'); // You'll need to add this file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your project URL
  storageBucket: 'your-project-id.appspot.com' // Replace with your storage bucket
});

const db = admin.firestore();
const auth = admin.auth();

async function seedUsers() {
  console.log('🌱 Seeding users...');
  
  const users = [
    {
      email: 'admin@sportassessment.com',
      password: 'admin123',
      displayName: 'System Administrator',
      role: 'admin',
      profile: {
        isActive: true,
        preferences: {
          emailNotifications: true,
          pushNotifications: true,
          theme: 'system'
        }
      }
    },
    {
      email: 'coach1@sportassessment.com',
      password: 'coach123',
      displayName: 'Sarah Johnson',
      role: 'coach',
      profile: {
        isActive: true,
        specializations: ['Basketball', 'Swimming', 'Track and Field'],
        experience: '8 years',
        certifications: ['NASM-CPT', 'FMS Level 2'],
        preferences: {
          emailNotifications: true,
          pushNotifications: true,
          theme: 'light'
        }
      }
    },
    {
      email: 'coach2@sportassessment.com',
      password: 'coach123',
      displayName: 'Michael Chen',
      role: 'coach',
      profile: {
        isActive: true,
        specializations: ['Soccer', 'Tennis', 'Gymnastics'],
        experience: '12 years',
        certifications: ['ACSM-CPT', 'SFMA Level 1'],
        preferences: {
          emailNotifications: true,
          pushNotifications: false,
          theme: 'dark'
        }
      }
    },
    {
      email: 'assessor1@sportassessment.com',
      password: 'assessor123',
      displayName: 'Emma Rodriguez',
      role: 'assessor',
      profile: {
        isActive: true,
        location: 'Sports Medicine Clinic - Downtown',
        department: 'Physical Therapy',
        preferences: {
          emailNotifications: true,
          pushNotifications: true,
          theme: 'system'
        }
      }
    },
    {
      email: 'assessor2@sportassessment.com',
      password: 'assessor123',
      displayName: 'David Kim',
      role: 'assessor',
      profile: {
        isActive: true,
        location: 'University Sports Center',
        department: 'Athletic Training',
        preferences: {
          emailNotifications: false,
          pushNotifications: true,
          theme: 'light'
        }
      }
    }
  ];

  for (const userData of users) {
    try {
      // Create Firebase Auth user
      const userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.displayName,
        emailVerified: true
      });

      // Set custom claims for role
      await auth.setCustomUserClaims(userRecord.uid, { role: userData.role });

      // Create Firestore profile document
      await db.collection('users').doc(userRecord.uid).set({
        uid: userRecord.uid,
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role,
        ...userData.profile,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastLoginAt: admin.firestore.FieldValue.serverTimestamp(),
        assessmentCount: 0
      });

      console.log(`✅ Created user: ${userData.email} (${userData.role})`);
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        console.log(`⚠️  User already exists: ${userData.email}`);
      } else {
        console.error(`❌ Error creating user ${userData.email}:`, error.message);
      }
    }
  }
}

async function seedSampleAssessments() {
  console.log('🌱 Seeding sample assessments...');
  
  // Get assessor users
  const assessorsSnapshot = await db.collection('users')
    .where('role', '==', 'assessor')
    .get();
  
  if (assessorsSnapshot.empty) {
    console.log('No assessors found, skipping assessment seeding');
    return;
  }

  const assessors = [];
  assessorsSnapshot.forEach(doc => {
    assessors.push({ id: doc.id, ...doc.data() });
  });

  const sampleAthletes = [
    {
      name: 'Alex Thompson',
      age: 16,
      gender: 'Male',
      height: 175,
      weight: 68,
      sportType: 'Basketball'
    },
    {
      name: 'Maria Garcia',
      age: 18,
      gender: 'Female',
      height: 168,
      weight: 62,
      sportType: 'Swimming'
    },
    {
      name: 'James Wilson',
      age: 17,
      gender: 'Male',
      height: 182,
      weight: 75,
      sportType: 'Soccer'
    },
    {
      name: 'Sophie Brown',
      age: 15,
      gender: 'Female',
      height: 165,
      weight: 58,
      sportType: 'Gymnastics'
    },
    {
      name: 'Ryan Davis',
      age: 19,
      gender: 'Male',
      height: 188,
      weight: 85,
      sportType: 'Track and Field'
    }
  ];

  // Generate sample posture data
  function generatePostureData() {
    const baseScore = 70 + Math.random() * 25; // Score between 70-95
    const variation = 10;
    
    return {
      shoulderSymmetry: Math.max(60, Math.min(100, baseScore + (Math.random() - 0.5) * variation)),
      hipAlignment: Math.max(60, Math.min(100, baseScore + (Math.random() - 0.5) * variation)),
      spinalCurvature: Math.max(60, Math.min(100, baseScore + (Math.random() - 0.5) * variation)),
      headTilt: Math.max(60, Math.min(100, baseScore + (Math.random() - 0.5) * variation)),
      forwardHeadPosture: Math.max(60, Math.min(100, baseScore + (Math.random() - 0.5) * variation)),
      overallPostureScore: parseFloat(baseScore.toFixed(1))
    };
  }

  for (let i = 0; i < sampleAthletes.length; i++) {
    const athlete = sampleAthletes[i];
    const assessor = assessors[i % assessors.length];
    const postureData = generatePostureData();
    
    // Create assessment date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const assessmentDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    const assessment = {
      athleteDetails: athlete,
      postureAnalysis: postureData,
      assessorId: assessor.id,
      assessorEmail: assessor.email,
      assessmentDate: admin.firestore.Timestamp.fromDate(assessmentDate),
      status: Math.random() > 0.3 ? 'completed' : 'pending',
      notes: generateNotes(postureData),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    try {
      const docRef = await db.collection('assessments').add(assessment);
      console.log(`✅ Created assessment for ${athlete.name} (ID: ${docRef.id})`);
    } catch (error) {
      console.error(`❌ Error creating assessment for ${athlete.name}:`, error.message);
    }
  }
}

function generateNotes(postureData) {
  const notes = [];
  
  if (postureData.shoulderSymmetry < 75) {
    notes.push('Noticeable shoulder asymmetry - recommend strengthening weaker side.');
  }
  if (postureData.forwardHeadPosture < 75) {
    notes.push('Forward head posture detected - focus on neck strengthening exercises.');
  }
  if (postureData.spinalCurvature < 75) {
    notes.push('Spinal alignment needs attention - core stability work recommended.');
  }
  
  if (notes.length === 0) {
    notes.push('Overall good posture. Continue current training routine.');
  }
  
  return notes.join(' ');
}

async function seedSystemConfig() {
  console.log('🌱 Seeding system configuration...');
  
  const config = {
    app: {
      version: '1.0.0',
      maintenance: false,
      features: {
        videoUpload: true,
        realTimeAnalysis: true,
        notifications: true,
        analytics: true
      }
    },
    analysis: {
      scoreThresholds: {
        excellent: 90,
        good: 80,
        fair: 70,
        poor: 60
      },
      weightings: {
        shoulderSymmetry: 0.2,
        hipAlignment: 0.2,
        spinalCurvature: 0.25,
        headTilt: 0.15,
        forwardHeadPosture: 0.2
      }
    },
    storage: {
      maxVideoSize: 52428800, // 50MB
      videoRetentionDays: 30,
      allowedFormats: ['mp4', 'mov', 'avi']
    }
  };

  try {
    await db.collection('config').doc('system').set(config);
    console.log('✅ System configuration created');
  } catch (error) {
    console.error('❌ Error creating system config:', error.message);
  }
}

// Main seeding function
async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');
  
  try {
    await seedUsers();
    console.log('');
    
    await seedSampleAssessments();
    console.log('');
    
    await seedSystemConfig();
    console.log('');
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\nDefault login credentials:');
    console.log('Admin: admin@sportassessment.com / admin123');
    console.log('Coach: coach1@sportassessment.com / coach123');
    console.log('Assessor: assessor1@sportassessment.com / assessor123');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
  
  process.exit(0);
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedUsers, seedSampleAssessments, seedSystemConfig };

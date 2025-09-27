# Sports Posture Assessment - Backend Cloud Services

This repository contains the Firebase backend configuration, Firestore security rules, and Cloud Functions for the Sports Posture Assessment System.

## Architecture Overview

The backend provides:
- Firebase Authentication for assessors and coaches
- Firestore NoSQL database for assessments and user data
- Cloud Storage for video uploads
- Cloud Functions for real-time processing
- Security rules for role-based access control

## Project Structure

```
posture_assessment_backend_cloud/
├── firebase.json                 # Firebase project configuration
├── firestore.rules              # Firestore security rules
├── storage.rules                # Cloud Storage security rules
├── functions/                   # Cloud Functions
│   ├── package.json
│   ├── index.js
│   └── src/
│       ├── auth.js              # Authentication triggers
│       ├── assessments.js       # Assessment processing
│       └── notifications.js     # Real-time notifications
├── firestore-indexes.json       # Database index configuration
├── database-seeding/            # Initial data setup
│   ├── seed-users.js
│   └── seed-sample-data.js
└── docs/
    ├── API.md                   # API documentation
    └── SECURITY.md              # Security implementation
```

## Setup Instructions

1. **Firebase Project Setup**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Create new project (replace with your desired project ID)
   firebase projects:create sports-posture-assessment-2025 --display-name "Sports Posture Assessment"
   
   # Set active project
   firebase use sports-posture-assessment-2025
   ```

2. **Install Dependencies**
   ```bash
   # Install Cloud Functions dependencies
   cd functions
   npm install
   cd ..
   
   # Install firebase-admin for testing (if needed)
   npm install firebase-admin
   ```

3. **Start Development Environment**
   ```bash
   # Start Firebase emulators for testing
   firebase emulators:start --only auth,firestore,functions,storage --project sports-posture-assessment-2025
   
   # Alternative: Use the provided batch script
   .\start-emulators.bat
   ```

4. **Test Backend Functionality**
   ```bash
   # Run comprehensive backend test
   node test-report-upload.js
   
   # Access Emulator UI
   # Open: http://127.0.0.1:4000
   ```

5. **Production Deployment** (When ready)
   ```bash
   # Deploy security rules
   firebase deploy --only firestore:rules,storage:rules
   
   # Deploy Cloud Functions
   firebase deploy --only functions
   
   # Initialize database with sample data
   node database-seeding/seed-users.js
   ```

## Security Model

### Role-Based Access Control
- **Assessors**: Can create and read assessments, upload videos
- **Coaches**: Can read all assessments, verify results
- **Admin**: Full access to all data

### Data Protection
- All user data encrypted at rest
- Video uploads secured with signed URLs
- Audit logging for all data access
- GDPR compliance for data deletion

## Cloud Functions

### Authentication Triggers
- `onUserCreate`: Set up initial user profile
- `onUserDelete`: Clean up associated data

### Assessment Processing
- `processVideoUpload`: Validate and process assessment videos
- `generateReportSummary`: Create assessment summaries
- `notifyCoachNewAssessment`: Real-time notifications

## Testing & Development

### Local Development Setup
```bash
# 1. Start Firebase emulators
firebase emulators:start --only auth,firestore,functions,storage --project sports-posture-assessment-2025

# 2. Open Emulator UI in browser
# Navigate to: http://127.0.0.1:4000

# 3. Test backend functionality
node test-report-upload.js
```

### Emulator Endpoints
- **Authentication**: `http://127.0.0.1:9099`
- **Firestore Database**: `http://127.0.0.1:8080`  
- **Cloud Functions**: `http://127.0.0.1:5001`
- **Storage**: `http://127.0.0.1:9199`
- **Emulator UI**: `http://127.0.0.1:4000`

### Test Results (Verified Working ✅)
```
🎉 REPORT UPLOAD TEST COMPLETED SUCCESSFULLY! 🎉

📊 Test Results Summary:
   ✅ User Creation: PASSED
   ✅ Assessment Storage: PASSED
   ✅ Summary Generation: PASSED
   ✅ Notification System: PASSED
   ✅ Data Retrieval: PASSED
   ✅ Query Functionality: PASSED
   ✅ Real-time Updates: PASSED

📋 Database Contents:
   👥 Users: 2 (Assessor + Coach)
   📄 Assessments: 1 (Complete with posture data)
   📈 Summaries: 1 (Auto-generated)
   🔔 Notifications: 1 (Coach alert)
```

### Cloud Functions Status
All functions loaded and working:
- `onUserCreate` - ✅ User profile creation
- `onUserDelete` - ✅ Data cleanup  
- `processVideoUpload` - ✅ Video processing
- `generateReportSummary` - ✅ Assessment summaries
- `notifyCoachNewAssessment` - ✅ Coach notifications
- `healthCheck` - ✅ API monitoring

### Health Check Endpoint
```bash
# Test API health
curl http://127.0.0.1:5001/sports-posture-assessment-2025/us-central1/healthCheck
```

## Environment Variables

### 🔍 **Do I Need Environment Variables?**

**For Development/Testing (Emulators)**: ❌ **NO** - No environment variables needed!
- Emulators use default local configurations
- Everything works out of the box
- Just run the emulators and test

**For Production Deployment**: ✅ **YES** - Environment variables required
- Firebase project settings
- Security keys
- Email configuration (optional)
- Storage limits

### 🚀 **Development (Current Setup)**
```bash
# No .env file needed! Just run:
firebase emulators:start --only auth,firestore,functions,storage --project sports-posture-assessment-2025
```

### 🏭 **Production Setup**
When ready to deploy to production:

1. **Copy the environment template**:
   ```bash
   cp .env.example .env
   ```

2. **Run the environment setup script**:
   ```bash
   # Windows
   .\setup-env.bat
   
   # Linux/Mac  
   ./setup-env.sh
   ```

3. **Update security values**:
   ```bash
   firebase functions:config:set security.jwt_secret="your-actual-secure-key"
   firebase functions:config:set security.encryption_key="your-actual-encryption-key"
   ```

4. **Deploy to production**:
   ```bash
   firebase deploy --only functions,firestore:rules,storage:rules
   ```

### 📋 **Current Status**
- ✅ **Development**: Ready (no env vars needed)
- ✅ **Testing**: Fully functional  
- ✅ **Environment Templates**: Created (.env.example)
- ✅ **Setup Scripts**: Ready (setup-env.bat/sh)
- 🟡 **Production**: Ready to configure when needed

## Troubleshooting

### Common Issues & Solutions

1. **Emulators won't start**
   ```bash
   # Kill existing processes and restart
   taskkill /F /IM node.exe
   firebase emulators:start --only auth,firestore --project sports-posture-assessment-2025
   ```

2. **Module not found errors**
   ```bash
   # Install missing dependencies
   npm install firebase-admin
   cd functions && npm install && cd ..
   ```

3. **Port conflicts**
   ```bash
   # Check which ports are in use
   netstat -ano | findstr :8080
   netstat -ano | findstr :9099
   ```

4. **Firebase project not found**
   ```bash
   # Verify project exists and you have access
   firebase projects:list
   firebase use sports-posture-assessment-2025
   ```

### Development Workflow

1. **Start Development Session**
   ```bash
   cd "path/to/posture_assessment_backend_cloud"
   firebase emulators:start --only auth,firestore,functions,storage
   ```

2. **Run Tests**
   ```bash
   node test-report-upload.js
   ```

3. **View Data**
   - Open: `http://127.0.0.1:4000`
   - Navigate to Firestore tab
   - Check Authentication tab for users

## Monitoring & Analytics

Firebase provides built-in monitoring for:
- Authentication metrics
- Database read/write operations
- Cloud Function execution logs
- Storage usage analytics

## Support

### Quick Start Commands (Copy & Paste Ready)
```bash
# Complete setup in one go
cd "e:\project\New folder\Sports\posture_assessment_backend_cloud"
npm install firebase-admin
firebase use sports-posture-assessment-2025
firebase emulators:start --only auth,firestore,functions,storage --project sports-posture-assessment-2025
```

Then in a new terminal:
```bash
cd "e:\project\New folder\Sports\posture_assessment_backend_cloud"
node test-report-upload.js
```

### Working Project Details
- **Project ID**: `sports-posture-assessment-2025`
- **Project Name**: `Sports Posture Assessment`
- **Firebase Console**: https://console.firebase.google.com/project/sports-posture-assessment-2025/overview
- **Status**: ✅ **FULLY FUNCTIONAL** - All tests passing

### Test Results Confirmed ✅
- User management system working
- Assessment storage verified  
- Real-time notifications functional
- Query system operational
- Cloud Functions loaded successfully

For technical issues or questions about the backend setup, please refer to the documentation in the `docs/` directory or contact the development team.

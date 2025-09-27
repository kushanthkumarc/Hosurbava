# Quick Start Guide - Sports Posture Assessment Backend

## 🚀 One-Command Setup

```bash
# Navigate to backend directory
cd "e:\project\New folder\Sports\posture_assessment_backend_cloud"

# Install dependencies
npm install firebase-admin

# Start emulators
firebase emulators:start --only auth,firestore,functions,storage --project sports-posture-assessment-2025
```

## 🧪 Test Everything Works

In a new terminal:
```bash
cd "e:\project\New folder\Sports\posture_assessment_backend_cloud"
node test-report-upload.js
```

## 📊 Expected Success Output

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
```

## 🌐 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **Emulator UI** | http://127.0.0.1:4000 | Visual database/auth management |
| **Firestore** | http://127.0.0.1:8080 | Database operations |
| **Auth** | http://127.0.0.1:9099 | User authentication |
| **Functions** | http://127.0.0.1:5001 | API endpoints |
| **Storage** | http://127.0.0.1:9199 | File uploads |

## 🔧 Working Functions

- ✅ `onUserCreate` - Auto-create user profiles
- ✅ `processVideoUpload` - Handle assessment videos  
- ✅ `generateReportSummary` - Create assessment summaries
- ✅ `notifyCoachNewAssessment` - Send coach notifications
- ✅ `healthCheck` - API monitoring

## 🎯 Status: FULLY OPERATIONAL ✅

Your backend is ready for Flutter app integration!

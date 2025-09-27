# API Documentation - Sports Posture Assessment System

## Overview

The Sports Posture Assessment System provides a RESTful API through Firebase Cloud Functions and Firestore for managing posture assessments, user authentication, and real-time notifications.

## Base URL

```
https://us-central1-your-project-id.cloudfunctions.net/
```

## Authentication

All API endpoints require Firebase ID tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

## Data Models

### User Model

```json
{
  "uid": "string",
  "email": "string",
  "displayName": "string",
  "role": "assessor|coach|admin",
  "isActive": "boolean",
  "createdAt": "timestamp",
  "lastLoginAt": "timestamp",
  "assessmentCount": "number",
  "preferences": {
    "emailNotifications": "boolean",
    "pushNotifications": "boolean",
    "theme": "light|dark|system"
  }
}
```

### Assessment Model

```json
{
  "assessmentId": "string",
  "athleteDetails": {
    "name": "string",
    "age": "number",
    "gender": "string",
    "height": "number",
    "weight": "number",
    "sportType": "string"
  },
  "postureAnalysis": {
    "shoulderSymmetry": "number",
    "hipAlignment": "number",
    "spinalCurvature": "number",
    "headTilt": "number",
    "forwardHeadPosture": "number",
    "overallPostureScore": "number"
  },
  "assessorId": "string",
  "assessorEmail": "string",
  "assessmentDate": "timestamp",
  "status": "pending|completed",
  "videoPath": "string",
  "notes": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Notification Model

```json
{
  "notificationId": "string",
  "recipientId": "string",
  "type": "new_assessment|daily_summary|system_alert",
  "title": "string",
  "message": "string",
  "isRead": "boolean",
  "priority": "low|normal|high",
  "createdAt": "timestamp",
  "expiresAt": "timestamp",
  "data": "object"
}
```

## Cloud Functions

### Authentication Functions

#### `setUserRole`
Sets or updates a user's role (admin only).

**Method:** `POST`
**URL:** `/setUserRole`

**Request Body:**
```json
{
  "uid": "string",
  "role": "assessor|coach|admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role updated to coach"
}
```

### Notification Functions

#### `markNotificationRead`
Marks a specific notification as read.

**Method:** `POST`
**URL:** `/markNotificationRead`

**Request Body:**
```json
{
  "notificationId": "string"
}
```

**Response:**
```json
{
  "success": true
}
```

#### `getUnreadNotificationCount`
Gets the count of unread notifications for the authenticated user.

**Method:** `GET`
**URL:** `/getUnreadNotificationCount`

**Response:**
```json
{
  "count": 5
}
```

## Firestore Collections

### `/users/{uid}`
User profile information and preferences.

**Read Access:** User themselves, coaches, admins
**Write Access:** User themselves, admins

### `/assessments/{assessmentId}`
Assessment reports and analysis data.

**Read Access:** Assessment creator, coaches, admins
**Write Access:** Assessment creator, coaches, admins

### `/notifications/{notificationId}`
User notifications and alerts.

**Read Access:** Notification recipient, admins
**Write Access:** System, admins

### `/assessment_summaries/{assessmentId}`
Generated assessment summaries for quick access.

**Read Access:** Coaches, admins
**Write Access:** System only (via Cloud Functions)

### `/daily_summaries/{date}`
Daily aggregated statistics and reports.

**Read Access:** Coaches, admins
**Write Access:** System only (via Cloud Functions)

## Storage Structure

### `/assessment-videos/{assessmentId}/{filename}`
Assessment video files uploaded by assessors.

**Upload Access:** Assessment creator
**Read Access:** Assessment creator, coaches, admins
**Size Limit:** 50MB
**Formats:** mp4, mov, avi

### `/profile-pictures/{userId}`
User profile pictures (optional).

**Upload Access:** User themselves
**Read Access:** User themselves
**Size Limit:** 2MB
**Formats:** jpg, png, gif

### `/report-exports/{assessmentId}/{filename}`
Generated PDF reports (system-generated).

**Read Access:** Coaches, admins
**Write Access:** System only

## Real-time Subscriptions

### Listen to New Assessments (Coaches)

```javascript
const unsubscribe = db.collection('assessments')
  .where('status', '==', 'completed')
  .orderBy('assessmentDate', 'desc')
  .limit(10)
  .onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        // Handle new assessment
        console.log('New assessment:', change.doc.data());
      }
    });
  });
```

### Listen to Notifications

```javascript
const unsubscribe = db.collection('notifications')
  .where('recipientId', '==', currentUser.uid)
  .where('isRead', '==', false)
  .orderBy('createdAt', 'desc')
  .onSnapshot(snapshot => {
    // Handle notification updates
    const unreadNotifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  });
```

## Error Handling

All API responses follow a consistent error format:

```json
{
  "error": {
    "code": "permission-denied",
    "message": "User does not have permission to access this resource"
  }
}
```

### Common Error Codes

- `unauthenticated`: User not logged in
- `permission-denied`: Insufficient permissions
- `invalid-argument`: Invalid or missing parameters
- `not-found`: Resource not found
- `already-exists`: Resource already exists
- `internal`: Server error

## Rate Limits

- Assessment creation: 100 per hour per user
- Notification marking: 1000 per hour per user
- File uploads: 50MB total per hour per user

## Webhooks

### Assessment Completed
Triggered when an assessment video is uploaded and processing is complete.

**URL:** `POST /webhooks/assessment-completed`
**Payload:**
```json
{
  "assessmentId": "string",
  "athleteName": "string",
  "assessorId": "string",
  "score": "number",
  "timestamp": "string"
}
```

### Daily Summary
Triggered daily at 9 AM with assessment statistics.

**URL:** `POST /webhooks/daily-summary`
**Payload:**
```json
{
  "date": "string",
  "totalAssessments": "number",
  "averageScore": "number",
  "topSports": ["string"]
}
```

## SDK Usage Examples

### JavaScript/TypeScript

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Create assessment
async function createAssessment(assessmentData) {
  try {
    const docRef = await addDoc(collection(db, 'assessments'), assessmentData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating assessment:', error);
    throw error;
  }
}
```

### Flutter/Dart

```dart
import 'package:cloud_firestore/cloud_firestore.dart';

class FirebaseService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  
  Future<String> createAssessment(Map<String, dynamic> assessmentData) async {
    try {
      final docRef = await _firestore.collection('assessments').add(assessmentData);
      return docRef.id;
    } catch (e) {
      print('Error creating assessment: $e');
      rethrow;
    }
  }
}
```

## Testing

Use Firebase Local Emulator Suite for testing:

```bash
firebase emulators:start --only firestore,functions,storage
```

Test endpoints are available at:
- Firestore: `http://localhost:8080`
- Functions: `http://localhost:5001`
- Storage: `http://localhost:9199`

## Support

For API support and questions:
- Documentation: `/docs/`
- Issues: Create a GitHub issue
- Email: dev-support@sportassessment.com

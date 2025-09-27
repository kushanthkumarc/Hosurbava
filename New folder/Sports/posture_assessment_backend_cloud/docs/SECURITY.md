# Security Implementation Guide

## Overview

The Sports Posture Assessment System implements a multi-layered security approach using Firebase Security Rules, role-based access control, and data validation to protect sensitive athlete information and assessment data.

## Security Architecture

### 1. Authentication Layer
- Firebase Authentication with email/password
- Custom claims for role-based authorization
- Session management with automatic token refresh
- Multi-factor authentication support (optional)

### 2. Authorization Layer
- Role-based access control (RBAC)
- Resource-level permissions
- Custom security rules for Firestore and Storage
- Function-level authorization checks

### 3. Data Protection Layer
- Encryption at rest (Firebase managed)
- Encryption in transit (HTTPS/TLS)
- Field-level data validation
- Audit logging for compliance

## Role-Based Access Control

### User Roles

#### Assessor
- **Create**: Own assessments, athlete profiles
- **Read**: Own assessments and related data
- **Update**: Own assessments (before completion)
- **Delete**: None (data retention policy)

#### Coach
- **Create**: Notifications, comments on assessments
- **Read**: All assessments, athlete profiles, analytics
- **Update**: Assessment verification status, notes
- **Delete**: Own comments only

#### Admin
- **Create**: All resources, user accounts, system configuration
- **Read**: All data, audit logs, analytics
- **Update**: All resources, user roles, system settings
- **Delete**: All resources (with audit trail)

### Implementation

```javascript
// Custom claims setting (Cloud Function)
await admin.auth().setCustomUserClaims(uid, { role: 'coach' });

// Client-side role checking
const idToken = await user.getIdTokenResult();
const userRole = idToken.claims.role;
```

## Firestore Security Rules

### User Collection Rules

```javascript
// Users can read/write their own profile
// Coaches/admins can read all profiles
match /users/{userId} {
  allow read: if isAuthenticated() && (
    request.auth.uid == userId || 
    hasRole('coach') || 
    hasRole('admin')
  );
  
  allow write: if isAuthenticated() && (
    request.auth.uid == userId || 
    hasRole('admin')
  );
}
```

### Assessment Collection Rules

```javascript
// Assessors can create/read own assessments
// Coaches can read all assessments
match /assessments/{assessmentId} {
  allow read: if isOwnerOrCoach(resource);
  allow create: if isAssessor() && 
    request.auth.uid == request.resource.data.assessorId;
  allow update: if canUpdateAssessment(resource);
}
```

### Helper Functions

```javascript
function hasRole(role) {
  return request.auth.token.role == role;
}

function isOwnerOrCoach(resource) {
  return resource.data.assessorId == request.auth.uid ||
         hasRole('coach') ||
         hasRole('admin');
}
```

## Storage Security Rules

### Video Upload Rules

```javascript
match /assessment-videos/{assessmentId}/{fileName} {
  // Only assessors can upload videos for their assessments
  allow write: if isAuthenticated() && 
    hasRole('assessor') &&
    request.resource.size <= 50 * 1024 * 1024 && // 50MB limit
    request.resource.contentType.matches('video/.*');
    
  // Coaches and admins can read all videos
  allow read: if hasRole('coach') || hasRole('admin');
}
```

## Data Validation

### Input Sanitization

```javascript
// Cloud Function validation example
exports.createAssessment = functions.https.onCall(async (data, context) => {
  // Validate authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  // Validate role
  if (context.auth.token.role !== 'assessor') {
    throw new functions.https.HttpsError('permission-denied', 'Only assessors can create assessments');
  }

  // Validate input data
  const { athleteDetails, postureAnalysis } = data;
  
  if (!athleteDetails || !athleteDetails.name || !athleteDetails.age) {
    throw new functions.https.HttpsError('invalid-argument', 'Athlete details are required');
  }

  if (!postureAnalysis || typeof postureAnalysis.overallPostureScore !== 'number') {
    throw new functions.https.HttpsError('invalid-argument', 'Valid posture analysis is required');
  }

  // Sanitize string inputs
  const sanitizedData = {
    athleteDetails: {
      name: sanitizeString(athleteDetails.name),
      age: parseInt(athleteDetails.age),
      // ... other fields
    }
  };
});
```

### Data Schema Validation

```javascript
const assessmentSchema = {
  athleteDetails: {
    name: { type: 'string', maxLength: 100, required: true },
    age: { type: 'number', min: 10, max: 50, required: true },
    gender: { type: 'string', enum: ['Male', 'Female', 'Other'], required: true },
    height: { type: 'number', min: 100, max: 250, required: true },
    weight: { type: 'number', min: 30, max: 200, required: true },
    sportType: { type: 'string', maxLength: 50, required: true }
  },
  postureAnalysis: {
    shoulderSymmetry: { type: 'number', min: 0, max: 100, required: true },
    hipAlignment: { type: 'number', min: 0, max: 100, required: true },
    spinalCurvature: { type: 'number', min: 0, max: 100, required: true },
    headTilt: { type: 'number', min: 0, max: 100, required: true },
    forwardHeadPosture: { type: 'number', min: 0, max: 100, required: true },
    overallPostureScore: { type: 'number', min: 0, max: 100, required: true }
  }
};
```

## Audit Logging

### Activity Tracking

```javascript
// Log user actions
async function logActivity(userId, action, resourceId, metadata = {}) {
  await db.collection('audit_logs').add({
    userId: userId,
    action: action,
    resourceId: resourceId,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    ipAddress: context.rawRequest?.ip,
    userAgent: context.rawRequest?.headers['user-agent'],
    metadata: metadata
  });
}

// Usage example
await logActivity(context.auth.uid, 'assessment_created', assessmentId, {
  athleteName: athleteDetails.name,
  sportType: athleteDetails.sportType
});
```

### Security Events

```javascript
// Track security-relevant events
const securityEvents = [
  'login_success',
  'login_failure',
  'role_changed',
  'data_accessed',
  'data_modified',
  'unauthorized_access_attempt'
];
```

## GDPR Compliance

### Data Subject Rights

#### Right to Access
```javascript
exports.getUserData = functions.https.onCall(async (data, context) => {
  // Verify user identity
  if (!context.auth || context.auth.uid !== data.userId) {
    throw new functions.https.HttpsError('permission-denied', 'Access denied');
  }

  // Collect all user data
  const userData = {
    profile: await getDocument('users', data.userId),
    assessments: await getAssessmentsByUser(data.userId),
    notifications: await getNotificationsByUser(data.userId),
    sessions: await getSessionsByUser(data.userId)
  };

  return userData;
});
```

#### Right to Deletion
```javascript
exports.deleteUserData = functions.https.onCall(async (data, context) => {
  // Verify admin or self-deletion
  if (!context.auth || (context.auth.uid !== data.userId && !hasRole('admin'))) {
    throw new functions.https.HttpsError('permission-denied', 'Access denied');
  }

  const batch = db.batch();
  
  // Anonymize rather than delete assessments (data integrity)
  const assessments = await getAssessmentsByUser(data.userId);
  assessments.forEach(doc => {
    batch.update(doc.ref, {
      assessorId: 'deleted_user',
      assessorEmail: 'deleted@example.com'
    });
  });

  // Delete personal data
  batch.delete(db.collection('users').doc(data.userId));
  
  await batch.commit();
});
```

## Security Monitoring

### Real-time Alerts

```javascript
// Monitor for suspicious activity
exports.securityMonitor = functions.firestore
  .document('audit_logs/{logId}')
  .onCreate(async (snap, context) => {
    const logData = snap.data();
    
    // Check for suspicious patterns
    if (isFailedLogin(logData)) {
      await checkForBruteForce(logData.userId);
    }
    
    if (isUnauthorizedAccess(logData)) {
      await alertAdministrators(logData);
    }
  });
```

### Security Metrics

```javascript
// Daily security report
exports.generateSecurityReport = functions.pubsub
  .schedule('0 2 * * *')
  .onRun(async (context) => {
    const yesterday = getYesterday();
    
    const metrics = {
      loginAttempts: await countLoginAttempts(yesterday),
      failedLogins: await countFailedLogins(yesterday),
      dataAccesses: await countDataAccesses(yesterday),
      securityEvents: await countSecurityEvents(yesterday)
    };
    
    if (metrics.failedLogins > 100) {
      await alertAdministrators(metrics);
    }
    
    await storeSecurityMetrics(metrics);
  });
```

## Best Practices

### Client-Side Security

1. **Token Management**
   ```javascript
   // Automatically refresh tokens
   auth.onAuthStateChanged(user => {
     if (user) {
       user.getIdToken(true); // Force refresh
     }
   });
   ```

2. **Secure Storage**
   ```dart
   // Flutter secure storage
   const storage = FlutterSecureStorage();
   await storage.write(key: 'user_token', value: token);
   ```

3. **Input Validation**
   ```javascript
   // Client-side validation (server-side is still required)
   function validateEmail(email) {
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return regex.test(email);
   }
   ```

### Server-Side Security

1. **Environment Variables**
   ```javascript
   // Use Firebase Functions environment config
   const config = functions.config();
   const apiKey = config.external.api_key;
   ```

2. **Rate Limiting**
   ```javascript
   // Implement rate limiting for sensitive operations
   const rateLimitMap = new Map();
   
   function isRateLimited(userId, action) {
     const key = `${userId}:${action}`;
     const requests = rateLimitMap.get(key) || [];
     const now = Date.now();
     
     // Remove old requests (older than 1 hour)
     const validRequests = requests.filter(time => now - time < 3600000);
     
     if (validRequests.length >= 100) { // 100 requests per hour
       return true;
     }
     
     validRequests.push(now);
     rateLimitMap.set(key, validRequests);
     return false;
   }
   ```

3. **Secure Headers**
   ```javascript
   // Set security headers for HTTP functions
   exports.api = functions.https.onRequest((req, res) => {
     res.set('X-Content-Type-Options', 'nosniff');
     res.set('X-Frame-Options', 'DENY');
     res.set('X-XSS-Protection', '1; mode=block');
     
     // Handle request...
   });
   ```

## Incident Response

### Security Incident Checklist

1. **Immediate Response**
   - Identify and isolate the incident
   - Assess the scope and impact
   - Notify stakeholders
   - Begin containment

2. **Investigation**
   - Collect audit logs
   - Analyze attack vectors
   - Document findings
   - Preserve evidence

3. **Recovery**
   - Patch vulnerabilities
   - Restore services
   - Update security rules
   - Monitor for reoccurrence

4. **Post-Incident**
   - Conduct lessons learned
   - Update procedures
   - Provide user notifications
   - Implement additional controls

### Contact Information

- **Security Team**: security@sportassessment.com
- **Incident Hotline**: +1-XXX-XXX-XXXX
- **Emergency Contact**: emergency@sportassessment.com

## Compliance Frameworks

### HIPAA (if handling health data)
- Encrypt all data in transit and at rest
- Implement access controls and audit logging
- Provide data breach notification procedures
- Maintain business associate agreements

### SOC 2 Type II
- Implement security, availability, and confidentiality controls
- Regular penetration testing
- Third-party security audits
- Incident response procedures

This security implementation provides comprehensive protection for the Sports Posture Assessment System while maintaining usability and compliance with relevant regulations.

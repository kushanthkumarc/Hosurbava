# Environment Variables Guide 🔐

## What Should Be in `.env` (NEVER commit to git!)

### 🚨 SENSITIVE - Keep Secret:
```bash
# Firebase Keys from Console
FIREBASE_API_KEY=AIzaSyDfXXXXXXXXXXXXXXXXXX  # Web API Key
FIREBASE_APP_ID=1:123456789:android:abcdef  # App ID
FIREBASE_MESSAGING_SENDER_ID=123456789012   # Sender ID

# Email Credentials
SMTP_USER=your-email@gmail.com              # Your Gmail
SMTP_PASS=abcd-efgh-ijkl-mnop               # Gmail App Password

# Security Keys
JWT_SECRET=super-secret-32-char-minimum     # JWT signing key
ENCRYPTION_KEY=another-32-char-secret-key   # Data encryption
```

### ✅ SAFE - Can be public:
```bash
# Project Configuration
FIREBASE_PROJECT_ID=sports-posture-assessment-2025  # Public project name
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com   # Public domain
FIREBASE_STORAGE_BUCKET=your-project.appspot.com    # Public bucket name

# App Settings
MAX_FILE_SIZE=52428800              # 50MB limit
VIDEO_RETENTION_DAYS=30             # Retention policy
ALLOWED_VIDEO_FORMATS=mp4,mov,avi   # Supported formats
ANALYTICS_ENABLED=true              # Feature flags
LOG_LEVEL=info                      # Logging level
```

## How to Get Firebase Keys 🔑

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select Project**: `sports-posture-assessment-2025`
3. **Project Settings** (gear icon) → **General** tab
4. **Your apps** section → **Add app** or select existing
5. **Copy the config values**:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyDfXXXXXXXXXXXXXXXXXX",      // Copy this
     authDomain: "project.firebaseapp.com",
     projectId: "sports-posture-assessment-2025", 
     storageBucket: "project.appspot.com",
     messagingSenderId: "123456789012",          // Copy this
     appId: "1:123456789:android:abcdef"         // Copy this
   };
   ```

## Gmail App Password Setup 📧

1. **Enable 2FA** on your Gmail account
2. **Go to**: Google Account → Security → 2-Step Verification
3. **App Passwords** → Generate password for "Custom app"
4. **Name it**: "Sports Posture Backend"
5. **Use the generated password** (not your regular password!)

## Environment Setup Commands 🛠️

### For Development (Local):
```bash
# No .env needed! Emulators work without it
firebase emulators:start
```

### For Production:
```bash
# 1. Copy template
copy .env.example .env

# 2. Edit .env with real values
# Replace all "your-*" placeholders

# 3. Deploy
firebase deploy
```

## Security Best Practices 🛡️

### ✅ DO:
- Keep `.env` in `.gitignore` 
- Use strong random keys (32+ characters)
- Use Gmail App Passwords (not regular passwords)
- Regularly rotate sensitive keys
- Use different keys for development/production
- Review Firebase Security Rules

### ❌ DON'T:
- Commit `.env` to git
- Share keys in chat/email
- Use weak or predictable keys
- Use production keys in development
- Store keys in code comments
- Use your regular Gmail password

## What's Safe for Open Source 📖

### ✅ Safe to Share:
- `.env.example` (with placeholder values)
- Project structure and code
- Configuration templates
- Documentation
- Firebase project ID (it's public anyway)
- Feature flags and settings

### 🚨 Never Share:
- Actual `.env` file
- API keys and secrets
- Email passwords
- Service account JSON files
- JWT secrets
- Any "your-*" values filled in

## Current Status ✅

```
✅ .env.example created (safe for git)
✅ .env created (add your real keys)
✅ .gitignore updated (protects secrets)
✅ Documentation provided
⚠️  Need to fill in real values in .env
```

## Quick Setup Checklist ☑️

1. **Copy template**: `copy .env.example .env`
2. **Get Firebase keys** from console
3. **Setup Gmail App Password**
4. **Generate JWT secret** (32+ random chars)
5. **Update .env** with real values
6. **Test locally** with emulators first
7. **Deploy to production**

## Example Random Key Generation 🎲

```bash
# For JWT_SECRET (Windows PowerShell)
[System.Web.Security.Membership]::GeneratePassword(32, 8)

# For ENCRYPTION_KEY (Windows PowerShell)  
-join ((1..32) | ForEach {Get-Random -input ([char[]]'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')})
```

---

**Remember**: Your `.env.example` is the template everyone sees. Your `.env` contains your real secrets and should NEVER be committed to git! 🔒

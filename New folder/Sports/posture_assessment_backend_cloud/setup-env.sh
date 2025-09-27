#!/bin/bash

# Production Environment Setup Script
# Run this script to configure Firebase Functions environment variables

echo "🔧 Setting up Firebase Functions Environment Variables..."
echo ""

# Firebase Project Configuration
echo "1️⃣ Setting Firebase Project Configuration..."
firebase functions:config:set app.project_id="sports-posture-assessment-2025"
firebase functions:config:set app.storage_bucket="sports-posture-assessment-2025.appspot.com"
firebase functions:config:set app.database_url="https://sports-posture-assessment-2025-default-rtdb.firebaseio.com"
firebase functions:config:set app.log_level="info"

# Storage Configuration
echo "2️⃣ Setting Storage Configuration..."
firebase functions:config:set storage.max_file_size="52428800"
firebase functions:config:set storage.retention_days="30"
firebase functions:config:set storage.allowed_formats="mp4,mov,avi"

# Security Configuration
echo "3️⃣ Setting Security Configuration..."
echo "⚠️  Please replace 'your-secret-key' with actual secure values:"
firebase functions:config:set security.jwt_secret="your-jwt-secret-key"
firebase functions:config:set security.encryption_key="your-encryption-key"
firebase functions:config:set security.rate_limit="100"

# Email Configuration (Optional)
echo "4️⃣ Setting Email Configuration..."
echo "⚠️  Configure these for email notifications:"
firebase functions:config:set email.enabled="false"
firebase functions:config:set email.host="smtp.gmail.com"
firebase functions:config:set email.port="587"
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-app-password"

# Analytics Configuration
echo "5️⃣ Setting Analytics Configuration..."
firebase functions:config:set analytics.enabled="true"

# Display current configuration
echo ""
echo "📋 Current Configuration:"
firebase functions:config:get

echo ""
echo "✅ Environment setup complete!"
echo ""
echo "📝 Next Steps:"
echo "   1. Update security keys with actual secure values"
echo "   2. Configure email settings if needed"
echo "   3. Deploy functions: firebase deploy --only functions"
echo ""

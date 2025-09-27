@echo off
echo 🔧 Environment Setup for Sports Posture Assessment Backend
echo.
echo Choose your setup option:
echo [D] Development (Local Emulators) - No .env needed
echo [P] Production (.env file required)
echo.
set /p choice="Enter choice (D/P): "

if /i "%choice%"=="D" goto DEVELOPMENT
if /i "%choice%"=="P" goto PRODUCTION
goto END

:DEVELOPMENT
echo.
echo 🔧 DEVELOPMENT MODE SETUP
echo ========================
echo ✅ No .env file needed for development!
echo ✅ Firebase emulators work with default settings
echo.
echo To start development:
echo 1. firebase emulators:start
echo 2. Test with: node test-report-upload.js
echo.
goto END

:PRODUCTION  
echo.
echo 🚀 PRODUCTION MODE SETUP
echo ========================
echo.
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created
) else (
    echo ⚠️  .env file already exists
)
echo.
echo 🔑 NEXT STEPS:
echo 1. Get Firebase keys from: https://console.firebase.google.com/
echo 2. Setup Gmail App Password
echo 3. Edit .env file with real values
echo 4. Read ENV_GUIDE.md for detailed instructions
echo.
echo 📖 Opening environment guide...
start ENV_GUIDE.md

REM Storage Configuration
echo 2️⃣ Setting Storage Configuration...
firebase functions:config:set storage.max_file_size="52428800"
firebase functions:config:set storage.retention_days="30"
firebase functions:config:set storage.allowed_formats="mp4,mov,avi"

REM Security Configuration
echo 3️⃣ Setting Security Configuration...
echo ⚠️  Please replace 'your-secret-key' with actual secure values:
firebase functions:config:set security.jwt_secret="your-jwt-secret-key"
firebase functions:config:set security.encryption_key="your-encryption-key"
firebase functions:config:set security.rate_limit="100"

REM Email Configuration (Optional)
echo 4️⃣ Setting Email Configuration...
echo ⚠️  Configure these for email notifications:
firebase functions:config:set email.enabled="false"
firebase functions:config:set email.host="smtp.gmail.com"
firebase functions:config:set email.port="587"
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-app-password"

REM Analytics Configuration
echo 5️⃣ Setting Analytics Configuration...
firebase functions:config:set analytics.enabled="true"

REM Display current configuration
echo.
echo 📋 Current Configuration:
firebase functions:config:get

echo.
echo ✅ Environment setup complete!
echo.
echo 📝 Next Steps:
echo    1. Update security keys with actual secure values
echo    2. Configure email settings if needed  
echo    3. Deploy functions: firebase deploy --only functions
echo.

pause

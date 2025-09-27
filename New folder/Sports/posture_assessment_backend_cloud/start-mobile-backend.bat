@echo off
echo ===================================================
echo    SPORTS POSTURE ASSESSMENT - MOBILE SETUP
echo ===================================================
echo.

echo Step 1: Killing any existing processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM java.exe 2>nul
timeout /t 2 >nul

echo Step 2: Starting Firebase Emulators...
echo - Authentication (port 9099)
echo - Firestore Database (port 8080) 
echo - Cloud Functions (port 5001)
echo - Storage (port 9199)
echo - Emulator UI (port 4000)
echo.

start "Firebase Emulators" cmd /k "firebase emulators:start --only auth,firestore,functions,storage --project sports-posture-assessment-2025"

echo Waiting for emulators to initialize...
timeout /t 15 >nul

echo Step 3: Starting Mobile Test Server (port 3000)...
start "Mobile Test Server" cmd /k "node mobile-test-server.js"

echo.
echo ✅ SETUP COMPLETE!
echo.
echo 📱 MOBILE ACCESS URLs:
echo    Test Server: http://192.168.1.9:3000/
echo    Emulator UI: http://192.168.1.9:4000/
echo    Health Check: http://192.168.1.9:5001/sports-posture-assessment-2025/us-central1/healthCheck
echo.
echo 💡 Try accessing these URLs from your mobile browser:
echo    http://192.168.1.9:3000/ (Simple test page)
echo    http://192.168.1.9:4000/ (Full Firebase UI)
echo.
echo Press any key to open test page in browser...
pause >nul

REM Open test page
start http://127.0.0.1:3000/

echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause

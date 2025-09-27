@echo off
echo Setting up Firebase Emulators for Sports Posture Assessment System...
echo.

REM Kill any existing Firebase processes
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo Starting Firebase emulators with required services...
echo - Authentication (port 9099)
echo - Firestore Database (port 8080) 
echo - Cloud Functions (port 5001)
echo - Storage (port 9199)
echo - Emulator UI (port 4000)
echo.

REM Start emulators with the exact services we need
firebase emulators:start --only auth,firestore,functions,storage --project sports-posture-assessment-2025

pause

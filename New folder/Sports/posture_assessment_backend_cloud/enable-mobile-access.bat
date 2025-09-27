@echo off
echo Setting up mobile access to Firebase emulators...
echo.

REM Add Windows Firewall rules for Firebase emulator ports
echo Adding firewall rules...
netsh advfirewall firewall add rule name="Firebase Emulator UI" dir=in action=allow protocol=TCP localport=4000
netsh advfirewall firewall add rule name="Firebase Functions" dir=in action=allow protocol=TCP localport=5001
netsh advfirewall firewall add rule name="Firebase Firestore" dir=in action=allow protocol=TCP localport=8080
netsh advfirewall firewall add rule name="Firebase Auth" dir=in action=allow protocol=TCP localport=9099
netsh advfirewall firewall add rule name="Firebase Storage" dir=in action=allow protocol=TCP localport=9199

echo.
echo ✅ Firewall rules added!
echo.
echo Now you can access your backend from mobile devices at:
echo 📱 Emulator UI: http://192.168.1.9:4000/
echo 🔧 Functions: http://192.168.1.9:5001/
echo 📊 Firestore: 192.168.1.9:8080
echo 🔑 Auth: 192.168.1.9:9099
echo 📁 Storage: 192.168.1.9:9199
echo.
pause

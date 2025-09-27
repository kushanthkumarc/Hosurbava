const fs = require('fs');
const path = require('path');

console.log('🔍 Environment Configuration Checker\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

console.log('📁 File Status:');
console.log(`   .env file: ${envExists ? '✅ Found' : '❌ Missing'}`);
console.log(`   .env.example: ${fs.existsSync('.env.example') ? '✅ Found' : '❌ Missing'}`);

if (!envExists) {
    console.log('\n🔧 For Development:');
    console.log('   No .env needed! Just run: firebase emulators:start');
    console.log('\n🚀 For Production:');
    console.log('   1. Copy .env.example to .env');
    console.log('   2. Fill in your real Firebase keys');
    console.log('   3. Read ENV_GUIDE.md for instructions');
    process.exit(0);
}

// Install dotenv if not already installed
try {
    require('dotenv').config();
} catch (err) {
    console.log('\n📦 Installing dotenv...');
    const { execSync } = require('child_process');
    execSync('npm install dotenv', { stdio: 'inherit' });
    require('dotenv').config();
}

console.log('\n🔑 Environment Variables:');

// Check required variables
const requiredVars = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_API_KEY', 
    'FIREBASE_APP_ID',
    'SMTP_USER',
    'SMTP_PASS',
    'JWT_SECRET'
];

const missingVars = [];
const placeholderVars = [];

requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
        missingVars.push(varName);
        console.log(`   ${varName}: ❌ Missing`);
    } else if (value.includes('your-') || value.includes('XXXX')) {
        placeholderVars.push(varName);
        console.log(`   ${varName}: ⚠️  Placeholder value`);
    } else {
        console.log(`   ${varName}: ✅ Set`);
    }
});

console.log('\n📊 Summary:');
if (missingVars.length === 0 && placeholderVars.length === 0) {
    console.log('   ✅ All environment variables properly configured!');
} else {
    if (missingVars.length > 0) {
        console.log(`   ❌ Missing: ${missingVars.join(', ')}`);
    }
    if (placeholderVars.length > 0) {
        console.log(`   ⚠️  Need real values: ${placeholderVars.join(', ')}`);
    }
    console.log('\n📖 See ENV_GUIDE.md for setup instructions');
}

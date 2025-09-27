const functions = require('firebase-functions');

console.log('🔍 Checking Environment Configuration...\n');

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV !== 'production';
console.log(`📍 Environment: ${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}`);

if (isDevelopment) {
  console.log('✅ Development mode - no environment variables required');
  console.log('🔥 Emulators will use default configurations');
} else {
  console.log('🏭 Production mode - checking required configuration...\n');
  
  // Check required configuration
  const config = functions.config();
  const checks = [
    { path: 'app.project_id', name: 'Project ID', required: true },
    { path: 'app.storage_bucket', name: 'Storage Bucket', required: true },
    { path: 'security.jwt_secret', name: 'JWT Secret', required: true },
    { path: 'security.encryption_key', name: 'Encryption Key', required: true },
    { path: 'storage.max_file_size', name: 'Max File Size', required: false },
    { path: 'email.enabled', name: 'Email Enabled', required: false },
    { path: 'analytics.enabled', name: 'Analytics Enabled', required: false }
  ];
  
  let allGood = true;
  
  checks.forEach(check => {
    const value = getNestedValue(config, check.path);
    const status = value ? '✅' : (check.required ? '❌' : '⚠️');
    const statusText = value ? 'SET' : (check.required ? 'MISSING (Required)' : 'NOT SET (Optional)');
    
    console.log(`${status} ${check.name}: ${statusText}`);
    
    if (check.required && !value) {
      allGood = false;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  
  if (allGood) {
    console.log('🎉 All required configuration is set!');
    console.log('✅ Ready for production deployment');
  } else {
    console.log('⚠️  Missing required configuration');
    console.log('📝 Run setup-env.bat to configure environment');
  }
}

// Display current configuration (safe - no secrets shown)
console.log('\n📋 Current Configuration Overview:');
if (!isDevelopment) {
  const config = functions.config();
  console.log('Project:', config.app?.project_id || 'Not set');
  console.log('Storage:', config.app?.storage_bucket ? 'Configured' : 'Not set');
  console.log('Security:', config.security?.jwt_secret ? 'Configured' : 'Not set');
  console.log('Email:', config.email?.enabled === 'true' ? 'Enabled' : 'Disabled');
  console.log('Analytics:', config.analytics?.enabled === 'true' ? 'Enabled' : 'Disabled');
} else {
  console.log('Using emulator defaults');
}

// Helper function to get nested object values
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

console.log('\n🚀 Configuration check complete!');

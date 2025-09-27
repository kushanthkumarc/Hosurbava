// Environment configuration for Cloud Functions
const functions = require('firebase-functions');

// Development vs Production configuration
const isDevelopment = process.env.NODE_ENV !== 'production';

// Firebase configuration
const firebaseConfig = {
  projectId: isDevelopment ? 'demo-project' : functions.config().app?.project_id || 'sports-posture-assessment-2025',
  storageBucket: isDevelopment ? 'demo-bucket' : functions.config().app?.storage_bucket || 'sports-posture-assessment-2025.appspot.com',
  databaseURL: isDevelopment ? 'http://127.0.0.1:8080' : functions.config().app?.database_url
};

// Email configuration (for production notifications)
const emailConfig = {
  enabled: !isDevelopment && functions.config().email?.enabled === 'true',
  host: functions.config().email?.host || 'smtp.gmail.com',
  port: functions.config().email?.port || 587,
  user: functions.config().email?.user,
  password: functions.config().email?.password
};

// Application settings
const appConfig = {
  maxFileSize: functions.config().storage?.max_file_size || 52428800, // 50MB
  videoRetentionDays: functions.config().storage?.retention_days || 30,
  allowedFormats: functions.config().storage?.allowed_formats?.split(',') || ['mp4', 'mov', 'avi'],
  analyticsEnabled: functions.config().analytics?.enabled === 'true' || isDevelopment,
  logLevel: functions.config().app?.log_level || 'info'
};

// Security settings
const securityConfig = {
  jwtSecret: functions.config().security?.jwt_secret,
  encryptionKey: functions.config().security?.encryption_key,
  rateLimitRequests: functions.config().security?.rate_limit || 100
};

// Export configuration
module.exports = {
  isDevelopment,
  firebase: firebaseConfig,
  email: emailConfig,
  app: appConfig,
  security: securityConfig,
  
  // Helper function to get config value with fallback
  get: (path, fallback = null) => {
    const keys = path.split('.');
    let value = functions.config();
    
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) break;
    }
    
    return value !== undefined ? value : fallback;
  },
  
  // Validate required configuration
  validate: () => {
    const required = [];
    
    if (!isDevelopment) {
      if (!firebaseConfig.projectId) required.push('app.project_id');
      if (!firebaseConfig.storageBucket) required.push('app.storage_bucket');
    }
    
    if (required.length > 0) {
      throw new Error(`Missing required configuration: ${required.join(', ')}`);
    }
  }
};

// Validate configuration on load
try {
  module.exports.validate();
  console.log('✅ Configuration validated successfully');
} catch (error) {
  console.error('❌ Configuration validation failed:', error.message);
}

#!/usr/bin/env node

/**
 * Environment Validation Script for Equi-Parents Bilingual Platform
 * Validates that all required environment variables are set correctly
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  const envVars = {};
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').replace(/^["']|["']$/g, '');
        }
      }
    });
  }
  
  return envVars;
}

// Required environment variables for different contexts
const requiredEnvVars = {
  development: [
    'NODE_ENV',
    'SITE_NAME',
    'DEFAULT_LANGUAGE',
    'SUPPORTED_LANGUAGES'
  ],
  staging: [
    'NODE_ENV',
    'SITE_URL',
    'SITE_NAME',
    'DEFAULT_LANGUAGE',
    'SUPPORTED_LANGUAGES'
  ],
  production: [
    'NODE_ENV',
    'SITE_URL',
    'SITE_NAME',
    'DEFAULT_LANGUAGE',
    'SUPPORTED_LANGUAGES',
    'CONTACT_EMAIL'
  ]
};

// Optional environment variables
const optionalEnvVars = [
  'GOOGLE_ANALYTICS_ID',
  'FACEBOOK_PIXEL_ID',
  'HOTJAR_ID',
  'MAILER_LITE_API_KEY',
  'FORMSPREE_ENDPOINT',
  'API_BASE_URL'
];

function validateEnvironment() {
  console.log('🔍 Validating environment configuration...\n');
  
  // Load environment variables from .env file
  const envVars = loadEnvFile();
  const env = envVars.NODE_ENV || 'development';
  console.log(`📍 Environment: ${env}`);
  
  const required = requiredEnvVars[env] || requiredEnvVars.development;
  const missing = [];
  const present = [];
  
  // Check required variables
  required.forEach(varName => {
    if (envVars[varName]) {
      present.push(varName);
    } else {
      missing.push(varName);
    }
  });
  
  // Check optional variables
  const optionalPresent = [];
  optionalEnvVars.forEach(varName => {
    if (envVars[varName]) {
      optionalPresent.push(varName);
    }
  });
  
  // Results
  console.log('\n✅ Required variables present:');
  present.forEach(varName => {
    console.log(`   ${varName}: ${envVars[varName]}`);
  });
  
  if (optionalPresent.length > 0) {
    console.log('\n🔧 Optional variables present:');
    optionalPresent.forEach(varName => {
      console.log(`   ${varName}: ${process.env[varName].substring(0, 20)}...`);
    });
  }
  
  if (missing.length > 0) {
    console.log('\n❌ Missing required variables:');
    missing.forEach(varName => {
      console.log(`   ${varName}`);
    });
    console.log('\n💡 Create a .env file based on .env.example');
    process.exit(1);
  }
  
  console.log('\n🎉 Environment validation successful!');
  
  // Check if .env.example exists
  const envExamplePath = path.join(process.cwd(), '.env.example');
  if (fs.existsSync(envExamplePath)) {
    console.log('📝 .env.example file found');
  } else {
    console.log('⚠️  .env.example file not found');
  }
  
  // Check if .env exists
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    console.log('🔒 .env file found (local configuration)');
  } else {
    console.log('ℹ️  No .env file found (using system environment)');
  }
}

// Validate current language setup
function validateLanguageSetup() {
  console.log('\n🌍 Validating bilingual setup...');
  
  const enDir = path.join(process.cwd(), 'en');
  const esDir = path.join(process.cwd(), 'es');
  
  if (!fs.existsSync(enDir)) {
    console.log('❌ English directory (/en/) not found');
    return false;
  }
  
  if (!fs.existsSync(esDir)) {
    console.log('❌ Spanish directory (/es/) not found');
    return false;
  }
  
  const enFiles = fs.readdirSync(enDir).filter(f => f.endsWith('.html'));
  const esFiles = fs.readdirSync(esDir).filter(f => f.endsWith('.html'));
  
  console.log(`📄 English pages: ${enFiles.length}`);
  console.log(`📄 Spanish pages: ${esFiles.length}`);
  
  if (enFiles.length !== esFiles.length) {
    console.log('⚠️  Mismatch in number of language files');
  } else {
    console.log('✅ Language files are balanced');
  }
  
  return true;
}

// Main execution
if (require.main === module) {
  validateEnvironment();
  validateLanguageSetup();
}
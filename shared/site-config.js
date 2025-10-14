/**
 * Site Configuration for Equi-Parents Bilingual Platform
 * This file contains configuration that can be used across the application
 */

// Environment detection
const getEnvironment = () => {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  } else if (hostname.includes('deploy-preview') || hostname.includes('staging')) {
    return 'staging';
  } else {
    return 'production';
  }
};

// Site configuration object
const siteConfig = {
  // Environment
  environment: getEnvironment(),
  
  // Site information
  siteName: 'Equi-Parents Bilingual Platform',
  siteDescription: 'A bilingual co-parenting platform to simplify managing agreements, time, and communication between separated parents',
  
  // Language settings
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es'],
  
  // URLs based on environment
  siteUrl: (() => {
    const env = getEnvironment();
    switch (env) {
      case 'development':
        return 'http://localhost:3000';
      case 'staging':
        return `https://${window.location.hostname}`;
      case 'production':
        return 'https://equiparents-bilingual-platform.netlify.app'; // Update with your actual domain
      default:
        return window.location.origin;
    }
  })(),
  
  // Contact information
  contact: {
    email: 'contact@equiparents.app',
    support: 'support@equiparents.app',
    admin: 'admin@equiparents.app'
  },
  
  // Social media links
  social: {
    linkedin: 'https://linkedin.com/company/equiparents',
    facebook: 'https://facebook.com/equiparents',
    twitter: 'https://twitter.com/equiparents',
    instagram: 'https://instagram.com/equiparents'
  },
  
  // Features flags
  features: {
    analytics: true,
    forms: true,
    languageSwitcher: true,
    debugMode: getEnvironment() !== 'production'
  },
  
  // API endpoints (for future use)
  api: {
    baseUrl: getEnvironment() === 'production' 
      ? 'https://api.equiparents.app' 
      : 'http://localhost:3001',
    version: 'v1'
  },
  
  // Language mappings
  languages: {
    en: {
      name: 'English',
      flag: '🇺🇸',
      direction: 'ltr'
    },
    es: {
      name: 'Español',
      flag: '🇪🇸',
      direction: 'ltr'
    }
  }
};

// Utility functions
const siteUtils = {
  /**
   * Get current language from URL path
   */
  getCurrentLanguage() {
    const path = window.location.pathname;
    const langMatch = path.match(/^\/([a-z]{2})\//);
    return langMatch ? langMatch[1] : siteConfig.defaultLanguage;
  },
  
  /**
   * Get localized URL for a path
   */
  getLocalizedUrl(path, language = null) {
    const lang = language || this.getCurrentLanguage();
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${siteConfig.siteUrl}/${lang}/${cleanPath}`;
  },
  
  /**
   * Log debug information if debug mode is enabled
   */
  debug(...args) {
    if (siteConfig.features.debugMode) {
      console.log('[Equi-Parents Debug]:', ...args);
    }
  },
  
  /**
   * Get opposite language
   */
  getOppositeLanguage() {
    const current = this.getCurrentLanguage();
    return current === 'en' ? 'es' : 'en';
  }
};

// Make configuration available globally
window.siteConfig = siteConfig;
window.siteUtils = siteUtils;

// Log configuration in development
if (siteConfig.features.debugMode) {
  console.log('🌍 Equi-Parents Site Configuration:', siteConfig);
}

// Export for module systems (if used in the future)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { siteConfig, siteUtils };
}
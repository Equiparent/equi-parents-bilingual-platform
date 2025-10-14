/**
 * Environment Configuration for Equi-Parents Bilingual Platform
 * Handles environment variables for static HTML deployment
 */

class EnvConfig {
    constructor() {
        this.env = this.loadEnvironment();
    }

    loadEnvironment() {
        // For static sites, we can use build-time environment variables
        // or runtime configuration through meta tags or global objects
        
        const defaultConfig = {
            NODE_ENV: 'production',
            SITE_URL: 'https://equiparent.app',
            SITE_NAME: 'Equi-Parents Bilingual Platform',
            SITE_DESCRIPTION: 'A bilingual co-parenting platform to simplify managing agreements, time, and communication between separated parents',
            DEFAULT_LANGUAGE: 'en',
            SUPPORTED_LANGUAGES: 'en,es',
            TIMEZONE: 'America/Santiago',
            CONTACT_EMAIL: 'contact@equiparent.app',
            SUPPORT_EMAIL: 'support@equiparent.app'
        };

        // Check for runtime environment variables (from build process or meta tags)
        const runtimeConfig = this.getRuntimeConfig();
        
        return { ...defaultConfig, ...runtimeConfig };
    }

    getRuntimeConfig() {
        const config = {};
        
        // Check for environment variables from build process (Netlify, Vercel, etc.)
        if (typeof process !== 'undefined' && process.env) {
            Object.keys(process.env).forEach(key => {
                if (key.startsWith('SITE_') || key.startsWith('CONTACT_') || key.startsWith('DEFAULT_')) {
                    config[key] = process.env[key];
                }
            });
        }

        // Check for meta tags with environment config
        if (typeof document !== 'undefined') {
            const metaTags = document.querySelectorAll('meta[name^="env:"]');
            metaTags.forEach(meta => {
                const key = meta.getAttribute('name').replace('env:', '').toUpperCase();
                config[key] = meta.getAttribute('content');
            });
        }

        return config;
    }

    get(key, defaultValue = null) {
        return this.env[key] || defaultValue;
    }

    isDevelopment() {
        return this.get('NODE_ENV') === 'development';
    }

    isProduction() {
        return this.get('NODE_ENV') === 'production';
    }

    getSiteUrl() {
        return this.get('SITE_URL');
    }

    getContactEmail() {
        return this.get('CONTACT_EMAIL');
    }

    getSupportEmail() {
        return this.get('SUPPORT_EMAIL');
    }

    getDefaultLanguage() {
        return this.get('DEFAULT_LANGUAGE');
    }

    getSupportedLanguages() {
        return this.get('SUPPORTED_LANGUAGES', 'en,es').split(',');
    }

    // Method to inject environment variables into HTML
    injectIntoHTML() {
        if (typeof document === 'undefined') return;

        // Update contact links
        const contactLinks = document.querySelectorAll('a[href*="contact@"]');
        contactLinks.forEach(link => {
            link.href = `mailto:${this.getContactEmail()}`;
        });

        // Update site title if needed
        const titleElements = document.querySelectorAll('[data-site-name]');
        titleElements.forEach(element => {
            element.textContent = this.get('SITE_NAME');
        });
    }
}

// Global instance
window.EnvConfig = new EnvConfig();

// Auto-inject on DOM load
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.EnvConfig.injectIntoHTML();
        });
    } else {
        window.EnvConfig.injectIntoHTML();
    }
}

// Export for Node.js environments (build scripts)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnvConfig;
}
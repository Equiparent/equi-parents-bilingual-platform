// Language Switcher Component
function createLanguageSwitcher(currentLang = 'en') {
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'landing.html';
    
    // Create language toggle buttons
    const languages = [
        { code: 'en', name: 'EN', flag: '🇺🇸', label: 'English' },
        { code: 'es', name: 'ES', flag: '🇪🇸', label: 'Español' }
    ];
    
    languages.forEach(lang => {
        const button = document.createElement('a');
        button.href = `../${lang.code}/${fileName}`;
        button.className = `lang-toggle ${currentLang === lang.code ? 'active' : ''}`;
        button.innerHTML = `<span class="lang-flag">${lang.flag}</span>${lang.name}`;
        button.title = lang.label;
        
        // Save language preference
        button.addEventListener('click', () => {
            localStorage.setItem('equi-parents-lang', lang.code);
        });
        
        switcher.appendChild(button);
    });
    
    return switcher;
}

// Initialize language switcher
function initLanguageSwitcher(currentLang = 'en') {
    // Add CSS if not already added
    if (!document.querySelector('#language-switcher-css')) {
        const link = document.createElement('link');
        link.id = 'language-switcher-css';
        link.rel = 'stylesheet';
        link.href = '../shared/language-switcher.css';
        document.head.appendChild(link);
    }
    
    // Add switcher to page
    const switcher = createLanguageSwitcher(currentLang);
    document.body.appendChild(switcher);
}

// Auto-detect current language from URL
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('/es/')) return 'es';
    if (path.includes('/en/')) return 'en';
    return 'en'; // default
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    initLanguageSwitcher(currentLang);
});
// Language Switcher Component
function createLanguageSwitcher(currentLang = 'en') {
    const switcher = document.createElement('div');
    // start hidden so CSS transition can animate it into view
    switcher.className = 'language-switcher hidden';
    
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

// Scroll behavior for language switcher
function handleLanguageSwitcherScroll() {
    const switcher = document.querySelector('.language-switcher');
    if (!switcher) return;
    
    const scrollThreshold = 100;
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > scrollThreshold) {
        switcher.classList.add('visible');
        switcher.classList.remove('hidden');
    } else {
        switcher.classList.add('hidden');
        switcher.classList.remove('visible');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    initLanguageSwitcher(currentLang);
    
    // Debounced scroll listener to avoid jank
    let scrollTimeout = null;
    function debouncedScroll() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            handleLanguageSwitcherScroll();
            scrollTimeout = null;
        }, 50); // 50ms debounce
    }

    // Add scroll listener
    window.addEventListener('scroll', debouncedScroll, { passive: true });
    handleLanguageSwitcherScroll(); // Initial check
});
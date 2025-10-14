const fs = require('fs');
const path = require('path');

/**
 * Script to check if all pages have both English and Spanish versions
 */

const enDir = path.join(__dirname, '..', 'en');
const esDir = path.join(__dirname, '..', 'es');

function getHtmlFiles(dir) {
    try {
        return fs.readdirSync(dir)
            .filter(file => file.endsWith('.html'))
            .map(file => file.replace('.html', ''));
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error.message);
        return [];
    }
}

function checkTranslations() {
    console.log('🔍 Checking translation completeness...\n');
    
    const enFiles = getHtmlFiles(enDir);
    const esFiles = getHtmlFiles(esDir);
    
    console.log(`📄 English pages (${enFiles.length}):`, enFiles.join(', '));
    console.log(`📄 Spanish pages (${esFiles.length}):`, esFiles.join(', '));
    console.log();
    
    // Check for missing English translations
    const missingEnglish = esFiles.filter(file => !enFiles.includes(file));
    if (missingEnglish.length > 0) {
        console.log('❌ Missing English translations:');
        missingEnglish.forEach(file => console.log(`   - ${file}.html`));
        console.log();
    }
    
    // Check for missing Spanish translations
    const missingSpanish = enFiles.filter(file => !esFiles.includes(file));
    if (missingSpanish.length > 0) {
        console.log('❌ Missing Spanish translations:');
        missingSpanish.forEach(file => console.log(`   - ${file}.html`));
        console.log();
    }
    
    if (missingEnglish.length === 0 && missingSpanish.length === 0) {
        console.log('✅ All pages have both English and Spanish versions!');
    } else {
        console.log('⚠️  Translation check completed with missing files.');
        process.exit(1);
    }
}

checkTranslations();
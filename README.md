# Equi-Parents - Bilingual Co-Parenting Platform

A web application to help separated parents manage agreements, time, and communication in both **English** and **Spanish**.

## 🌍 Languages Supported

- **English** (`/en/`) - Complete interface in English
- **Spanish** (`/es/`) - Complete interface in Spanish

## 🚀 Getting Started

### Prerequisites
- Node.js (>=16.0.0)
- pnpm (>=8.0.0)

### Installation
```bash
# Install pnpm globally if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install
```

### Development

```bash
# Start with language detection (recommended)
pnpm start

# Start directly with English version
pnpm start:en

# Start directly with Spanish version
pnpm start:es

# Serve without auto-opening
pnpm serve
```

## 📁 Project Structure

```
equi-parents/
├── index.html                 # Language detection and selection
├── en/                        # English version
│   ├── landing.html
│   ├── dashboard.html
│   └── ...
├── es/                        # Spanish version
│   ├── landing.html
│   ├── dashboard.html
│   └── ...
├── shared/                    # Shared components
│   ├── language-switcher.css
│   └── language-switcher.js
├── public/                    # Assets (images, icons, etc.)
└── scripts/                   # Utility scripts
```

## 🔄 Language Switching

The application includes:
- **Automatic language detection** based on browser settings
- **Manual language selector** on the main page
- **Language switcher component** on all pages (top-right corner)
- **Language preference memory** using localStorage

## 🛠 Available Scripts

### Development
- `pnpm start` - Start with language detection
- `pnpm start:en` - Start English version directly
- `pnpm start:es` - Start Spanish version directly
- `pnpm serve` - Start development server without auto-opening

### Validation & Quality
- `pnpm validate` - Validate all HTML files
- `pnpm validate:en` - Validate only English files
- `pnpm validate:es` - Validate only Spanish files
- `pnpm format` - Format all code files
- `pnpm lint:css` - Lint CSS files

### Internationalization
- `pnpm build:check` - Check translation completeness
- `pnpm sync-files` - Sync file structure between languages

### Assets
- `pnpm optimize` - Optimize images in public folder

## 🌐 Adding New Pages

When adding new pages:

1. Create the page in both languages:
   ```
   en/new-page.html
   es/new-page.html
   ```

2. Include the language switcher:
   ```html
   <script src="../shared/language-switcher.js"></script>
   ```

3. Set the correct `lang` attribute:
   ```html
   <html lang="en"> <!-- for English -->
   <html lang="es"> <!-- for Spanish -->
   ```

4. Update navigation links to use relative paths

5. Run translation check:
   ```bash
   pnpm build:check
   ```

## 🎨 Features

### Core Functionality
- **Dashboard** - Family control center
- **Calendar** - Shared family calendar
- **Agreements** - Financial and custody agreements
- **Expenses** - Expense tracking and management
- **Family Canvas** - Collaborative family planning

### Technical Features
- **Responsive Design** - Works on mobile and desktop
- **Progressive Enhancement** - Works without JavaScript
- **SEO Friendly** - Proper meta tags and structure
- **Accessibility** - ARIA labels and semantic HTML

## 🌟 Key Pages

### Landing Pages
- **English**: `/en/landing.html`
- **Spanish**: `/es/landing.html`

### Application Pages
- Dashboard (`dashboard.html`)
- Calendar (`calendar.html`)
- Family Canvas (`family_canvas.html`)
- Agreements (`agreements.html`)
- Team profiles (`about_ceo.html`, `about_cfo.html`)

## 🔧 Configuration

### Language Switcher
The language switcher is automatically added to all pages. To customize:
- Edit `shared/language-switcher.css` for styling
- Edit `shared/language-switcher.js` for functionality

### Default Language
The default language is determined by:
1. User's stored preference (localStorage)
2. Browser language settings
3. Fallback to English

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

When contributing:
1. Ensure both English and Spanish versions are updated
2. Run validation scripts before submitting
3. Test language switching functionality
4. Verify responsive design on mobile

## 📄 License

MIT License - see LICENSE file for details

---

**Equi-Parents** - Simplifying co-parenting, one family at a time. 👨‍👩‍👧‍👦
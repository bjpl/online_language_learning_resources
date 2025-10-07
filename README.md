# Language Learning Hub 🌍

A beautifully crafted, modern website that curates the best language learning resources from around the web. Built with passion for polyglots and language enthusiasts worldwide.

## 🌟 Features

- **Comprehensive Resource Library**: Curated collection of apps, books, podcasts, courses, and communities for 65+ languages
- **Beautiful, Modern Design**: Clean, elegant interface with thoughtful typography and color palette
- **Mobile-Responsive**: Works perfectly on all devices
- **Fast & Optimized**: Production build system with code splitting and lazy loading
- **Accessible**: WCAG compliant with semantic HTML and ARIA labels
- **Search & Filter**: Quickly find resources by language or type
- **Professional Development Workflow**: Vite, ESLint, Prettier for modern development

## 🗣️ Currently Featured Languages

We've curated comprehensive resource collections for:

- **Dutch (Nederlands)** 🇳🇱 - 100+ free resources covering both Dutch and Flemish variants
- **Danish (Dansk)** 🇩🇰 - 100+ resources including government programs and Nordic materials
- **Portuguese (Português)** 🇵🇹🇧🇷 - 150+ resources for both European (PT-PT) and Brazilian (PT-BR) variants

### Coming Soon
We're actively building comprehensive collections for:
- Spanish (Español) 🇪🇸
- French (Français) 🇫🇷
- German (Deutsch) 🇩🇪
- Italian (Italiano) 🇮🇹
- And more!

## 🚀 Live Site

Visit the live site: [https://bjpl.github.io/online_language_learning_resources/](https://bjpl.github.io/online_language_learning_resources/)

## 💻 Local Development

### Quick Start (Development Server)

1. Clone the repository:
```bash
git clone https://github.com/bjpl/online_language_learning_resources.git
cd online_language_learning_resources
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Alternative: Static File Server

If you prefer not to use the build system:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

### Available Scripts

- **`npm run dev`** - Start development server with hot module replacement
- **`npm run build`** - Build optimized production bundle
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Check code quality with ESLint
- **`npm run lint:fix`** - Auto-fix ESLint issues
- **`npm run format`** - Format code with Prettier
- **`npm run format:check`** - Check code formatting

## 📁 Project Structure

```
online_language_learning_resources/
├── index.html                   # Homepage
├── language.html                # Language-specific resource page
├── resources.html               # All resources page
├── about.html                   # About page
├── assets/
│   ├── css/                     # Stylesheets
│   │   ├── main.css             # Main styles
│   │   ├── components.css       # UI components
│   │   └── language.css         # Language page styles
│   └── js/                      # JavaScript modules
│       ├── main.js              # Main application logic
│       ├── language-loader.js   # Dynamic language loading
│       ├── loading-ui.js        # Loading states & spinners
│       ├── *-data.js            # 67 language data modules
│       └── grid-manager.js      # Grid layout management
├── tests/                       # Test files
├── docs/                        # Documentation
│   ├── BUILD_SYSTEM_GUIDE.md    # Build system documentation
│   └── development-notes/       # Development artifacts
├── scripts/                     # Build and utility scripts
├── vite.config.js               # Vite bundler configuration
├── eslint.config.js             # ESLint configuration
├── .prettierrc.json             # Prettier configuration
├── package.json                 # npm dependencies and scripts
└── README.md                    # This file
```

## 🎨 Design Philosophy

- **Content-First**: Resources are the star, design supports discoverability
- **Thoughtful Typography**: Crimson Text for headlines, Inter for body text
- **Meaningful Color Palette**: Deep purple (wisdom), golden (achievement), teal (growth)
- **Organic Layouts**: Asymmetry and breathing room for a handcrafted feel
- **Micro-interactions**: Subtle animations that feel intentional

## 🤝 Contributing

Contributions are welcome! If you have a great language learning resource to add:

1. Fork the repository
2. Add your resource to the appropriate language in `assets/js/data.js`
3. Submit a pull request with a description of the resource

### Resource Guidelines

When adding resources, please include:
- Resource name and URL
- Brief description (1-2 sentences)
- Level (Beginner, Intermediate, Advanced, All levels)
- Whether it's free or paid
- Any special features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Font families from Google Fonts
- Inspiration from the language learning community
- All the amazing resource creators who make language learning accessible

---

Built with ❤️ for language learners everywhere
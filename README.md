# Language Learning Hub 🌍

A beautifully crafted, modern website that curates the best language learning resources from around the web. Built with passion for polyglots and language enthusiasts worldwide.

## 🌟 Features

- **Comprehensive Resource Library**: Curated collection of apps, books, podcasts, courses, and communities for 67 languages
- **Beautiful, Modern Design**: Clean, elegant interface with thoughtful typography and color palette
- **Mobile-Responsive**: Works perfectly on all devices
- **Fast & Optimized**: Production build system with code splitting and lazy loading (98% faster load times)
- **Accessible**: WCAG compliant with semantic HTML and ARIA labels
- **Search & Filter**: Quickly find resources by language or type
- **Professional Development Workflow**: Vite, ESLint, Prettier, Vitest for modern development
- **Comprehensive Testing**: 50 automated tests with 100% pass rate
- **High Code Quality**: Zero ESLint errors, professional code standards

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

**Development**:
- **`npm run dev`** - Start development server with hot module replacement
- **`npm run build`** - Build optimized production bundle
- **`npm run preview`** - Preview production build locally

**Testing** (NEW in v2.1.0):
- **`npm run test`** - Run automated test suite (50 tests)
- **`npm run test:watch`** - Run tests in watch mode
- **`npm run test:ui`** - Interactive test UI
- **`npm run test:coverage`** - Generate coverage reports

**Code Quality**:
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
│       ├── resource-counter.js  # Resource counting utilities
│       ├── language-data/       # 67 language data modules
│       │   ├── language-metadata.js  # Lightweight language metadata
│       │   └── *-data.js        # Full language resource data
│       └── grid-manager.js      # Grid layout management
├── tests/                       # Test files (Vitest)
│   ├── unit/                    # Unit tests (50 tests)
│   └── setup.js                 # Test configuration
├── docs/                        # Documentation
│   ├── TESTING.md               # Testing guide
│   ├── ARCHITECTURE.md          # Architecture decisions
│   ├── DEVELOPMENT.md           # Development workflow
│   ├── DEPLOYMENT.md            # Deployment procedures
│   ├── BUILD_SYSTEM_GUIDE.md    # Build system details
│   └── development-notes/       # Development artifacts
├── scripts/                     # Build and utility scripts
├── vite.config.js               # Vite bundler configuration
├── vitest.config.js             # Vitest test configuration
├── eslint.config.js             # ESLint configuration
├── .prettierrc.json             # Prettier configuration
├── package.json                 # npm dependencies and scripts
├── CLAUDE.md                    # AI agent instructions
├── CLAUDE-PROJECT.md            # Project configuration
└── README.md                    # This file
```

## 🎨 Design Philosophy

- **Content-First**: Resources are the star, design supports discoverability
- **Thoughtful Typography**: Crimson Text for headlines, Inter for body text
- **Meaningful Color Palette**: Deep purple (wisdom), golden (achievement), teal (growth)
- **Organic Layouts**: Asymmetry and breathing room for a handcrafted feel
- **Micro-interactions**: Subtle animations that feel intentional

## 🧪 Testing

This project includes comprehensive automated testing:

- **50 unit tests** covering core functionality
- **100% pass rate** with continuous integration
- **Vitest** test framework (fast, Vite-native)
- **happy-dom** for browser environment simulation

Run tests:
```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode for development
npm run test:ui       # Interactive UI
npm run test:coverage # Coverage reports
```

See `docs/TESTING.md` for detailed testing guide.

---

## 🤝 Contributing

Contributions are welcome! If you have a great language learning resource to add:

1. Fork the repository
2. Add your resource to the appropriate language file in `assets/js/language-data/`
3. Run tests: `npm run test`
4. Verify build: `npm run build`
5. Submit a pull request with a description of the resource

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

## 📚 Documentation

- **[Testing Guide](docs/TESTING.md)** - Comprehensive testing documentation
- **[Architecture](docs/ARCHITECTURE.md)** - System design and patterns
- **[Development](docs/DEVELOPMENT.md)** - Development workflow and standards
- **[Deployment](docs/DEPLOYMENT.md)** - Deployment procedures
- **[Build System](docs/BUILD_SYSTEM_GUIDE.md)** - Build configuration details

---

Built with ❤️ for language learners everywhere
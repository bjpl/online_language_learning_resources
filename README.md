# Language Learning Hub

A comprehensive website curating language learning resources from around the web for polyglots and language enthusiasts.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Design](#design)
- [Contributing](#contributing)
- [License](#license)

## Overview

Language Learning Hub is a modern, accessible website that provides a curated collection of language learning resources including apps, books, podcasts, courses, and communities. The platform currently features comprehensive collections for Dutch, Danish, and Portuguese, with additional languages in active development.

Built with Vite 7.1, vanilla JavaScript, and Tailwind CSS, the site delivers a fast, responsive experience with WCAG 2.1 AAA accessibility compliance. The platform includes 73 automated tests ensuring reliability and code quality.

Live site: https://bjpl.github.io/online_language_learning_resources/

## Features

- Curated resource library covering apps, books, podcasts, courses, and communities for 67 languages
- Mobile-first responsive design with professional optimization for all device types
- WCAG 2.1 AAA accessibility compliance with semantic HTML and ARIA labels
- Production build system with code splitting and lazy loading for optimized performance
- Full-text search and filtering capabilities by language and resource type
- Comprehensive testing with 73 automated tests and 100% pass rate
- Progressive Web App capabilities for enhanced user experience

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Setup

Clone the repository:
```bash
git clone https://github.com/bjpl/online_language_learning_resources.git
cd online_language_learning_resources
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Access the application at `http://localhost:3000`

## Usage

### Development Server

Run the development server with hot module replacement:
```bash
npm run dev
```

### Production Build

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Static File Server

Alternative method using a simple file server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

## Project Structure

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
│       ├── loading-ui.js        # Loading states and spinners
│       ├── resource-counter.js  # Resource counting utilities
│       ├── language-data/       # Language data modules
│       │   ├── language-metadata.js  # Language metadata
│       │   └── *-data.js        # Language resource data
│       └── grid-manager.js      # Grid layout management
├── tests/                       # Vitest test files
│   ├── unit/                    # Unit tests
│   └── setup.js                 # Test configuration
├── docs/                        # Documentation
│   ├── TESTING.md               # Testing guide
│   ├── ARCHITECTURE.md          # Architecture documentation
│   ├── DEVELOPMENT.md           # Development workflow
│   ├── DEPLOYMENT.md            # Deployment procedures
│   └── BUILD_SYSTEM_GUIDE.md    # Build system details
├── vite.config.js               # Vite bundler configuration
├── vitest.config.js             # Vitest test configuration
├── eslint.config.js             # ESLint configuration
├── .prettierrc.json             # Prettier configuration
└── package.json                 # npm dependencies and scripts
```

## Development

### Code Quality Scripts

Check code quality with ESLint:
```bash
npm run lint
```

Auto-fix ESLint issues:
```bash
npm run lint:fix
```

Format code with Prettier:
```bash
npm run format
```

Check code formatting:
```bash
npm run format:check
```

### Adding Resources

Resources are managed in language-specific data files located in `assets/js/language-data/`. Each resource should include a name, URL, description, level designation, pricing status, and special features.

## Testing

The project includes comprehensive automated testing using Vitest 3.2 with happy-dom for browser environment simulation.

### Running Tests

Execute all tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Interactive test UI:
```bash
npm run test:ui
```

Generate coverage reports:
```bash
npm run test:coverage
```

The test suite includes 73 unit tests across 3 test suites, maintaining a 100% pass rate with continuous integration.

## Design

### Design Philosophy

The platform employs a content-first approach with thoughtful typography using Crimson Text for headlines and Inter for body text. The color palette features deep purple for wisdom, golden for achievement, and teal for growth. Layouts utilize organic asymmetry with intentional micro-interactions for an engaging user experience.

### Mobile Optimization

The site features 30 enhancement categories for mobile devices, including 48x48px touch targets for WCAG 2.1 AAA compliance, iPhone notch support with safe area insets, reduced motion accessibility, and optimization for phones, tablets, and foldable devices.

## Contributing

Contributions are welcome. To add resources:

1. Fork the repository
2. Add resources to the appropriate language file in `assets/js/language-data/`
3. Run tests: `npm run test`
4. Verify build: `npm run build`
5. Submit a pull request with a description of the additions

Resource submissions should include the resource name, URL, brief description, level designation, pricing status, and notable features.

## License

This project is available under the MIT License. See LICENSE file for details.

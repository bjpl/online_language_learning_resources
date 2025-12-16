# Language Learning Hub - Design System & Style Guide

> **Version:** 1.0.0
> **Last Updated:** 2025-01-27
> **Status:** Living Document

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Design Tokens](#design-tokens)
3. [Atomic Design System](#atomic-design-system)
4. [Components Library](#components-library)
5. [Code Standards](#code-standards)
6. [Data Structure Standards](#data-structure-standards)
7. [Accessibility Guidelines](#accessibility-guidelines)
8. [Performance Standards](#performance-standards)

---

## 🎨 Design Philosophy

### Core Principles

**Content-First Design**
Resources are the star of the show. Design supports discoverability and usability without overwhelming the content.

**Thoughtful Typography**
- **Display Font**: Crimson Text (serif) - For headlines and emotional impact
- **Body Font**: Inter (sans-serif) - For clarity and readability

**Meaningful Color Palette**
- **Purple (`#5B4E8C`)** - Wisdom, learning, contemplation
- **Golden (`#E8B04B`)** - Achievement, success, enlightenment
- **Teal (`#4A8B8C`)** - Growth, progress, exploration

**Organic Layouts**
Asymmetry and breathing room create a handcrafted, human feel rather than rigid, corporate aesthetics.

**Micro-interactions**
Subtle animations that feel intentional, not gratuitous. Every transition serves a purpose.

---

## 🎯 Design Tokens

### Color System

#### Primary Colors (Purple - Wisdom)
```css
--color-primary: #5B4E8C;         /* Deep purple */
--color-primary-light: #7B6EAC;   /* Light purple */
--color-primary-dark: #3B2E6C;    /* Dark purple */
--primary-50: #F5F3F7;            /* Lightest tint */
--primary-600: #5B4E8C;           /* Base */
--primary-700: #4A3E7C;           /* Darker */
```

#### Accent Colors (Golden - Achievement)
```css
--color-accent: #E8B04B;          /* Golden */
--color-accent-light: #F0C66B;    /* Light golden */
--color-accent-dark: #C89A3B;     /* Dark golden */
--accent-50: #FFF9E6;             /* Lightest tint */
```

#### Secondary Colors (Teal - Growth)
```css
--color-secondary: #4A8B8C;       /* Teal */
--color-secondary-light: #6AAAAC; /* Light teal */
--color-secondary-dark: #2A6B6C;  /* Dark teal */
```

#### Neutral Palette
```css
--color-dark: #1A1625;            /* Primary text */
--color-dark-soft: #2D2838;       /* Secondary dark */
--color-gray-900: #3F3A4B;        /* Darkest gray */
--color-gray-700: #5E5869;        /* Dark gray */
--color-gray-600: #6B6574;        /* Medium-dark gray */
--color-gray-500: #8E8896;        /* Medium gray */
--color-gray-300: #C4BFC9;        /* Light gray */
--color-gray-200: #D8D4DD;        /* Lighter gray */
--color-gray-100: #F0EEF2;        /* Lightest gray */
--color-white: #FFFFFF;           /* Pure white */
--color-off-white: #FAF9FB;       /* Background white */
```

#### Semantic Colors
```css
--color-success: #52C41A;         /* Success green */
--color-warning: #FAAD14;         /* Warning yellow */
--color-error: #F5222D;           /* Error red */
--color-info: #1890FF;            /* Info blue */
```

### Typography Scale

#### Font Families
```css
--font-display: 'Crimson Text', serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

#### Font Sizes (Fluid Typography)
```css
--fs-hero: clamp(2.5rem, 5vw + 1rem, 4.5rem);   /* 40px → 72px */
--fs-h1: clamp(2rem, 4vw + 1rem, 3.5rem);       /* 32px → 56px */
--fs-h2: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);  /* 28px → 40px */
--fs-h3: clamp(1.25rem, 2vw + 0.5rem, 1.75rem); /* 20px → 28px */
--fs-body: clamp(1rem, 1vw + 0.75rem, 1.125rem);/* 16px → 18px */
--fs-small: 0.875rem;                            /* 14px */
```

#### Font Weights
```css
--fw-light: 300;
--fw-normal: 400;
--fw-medium: 500;
--fw-semibold: 600;
--fw-bold: 700;
```

#### Line Heights
```css
--lh-tight: 1.2;      /* Headlines */
--lh-normal: 1.6;     /* Body text */
--lh-relaxed: 1.8;    /* Long-form content */
```

### Spacing Scale

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4.5rem;  /* 72px */
--space-3xl: 6rem;    /* 96px */
```

### Layout Tokens

```css
--container-max: 1200px;
--container-padding: clamp(1rem, 5vw, 2rem);
```

### Shadow System

```css
--shadow-sm: 0 2px 4px rgba(26, 22, 37, 0.08);
--shadow-md: 0 4px 12px rgba(26, 22, 37, 0.12);
--shadow-lg: 0 8px 24px rgba(26, 22, 37, 0.16);
--shadow-xl: 0 16px 48px rgba(26, 22, 37, 0.24);
```

### Border Radius

```css
--radius-sm: 0.375rem;  /* 6px - Badges, small buttons */
--radius-md: 0.625rem;  /* 10px - Cards, inputs */
--radius-lg: 1rem;      /* 16px - Large cards */
--radius-xl: 1.5rem;    /* 24px - Hero sections */
```

### Transitions

```css
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 600ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🧬 Atomic Design System

### Design Hierarchy

```
Atoms → Molecules → Organisms → Templates → Pages
```

#### 🔵 **Atoms** (Basic Building Blocks)
Single, indivisible UI elements

#### 🟢 **Molecules** (Compound Components)
Groups of atoms functioning together

#### 🟣 **Organisms** (Complex Sections)
Complex UI sections composed of molecules and atoms

---

## 📚 Components Library

### 🔵 ATOMS

#### 1. Buttons

**Variants:**
- **Sizes**: Small, Medium, Large
- **Types**: Primary, Secondary, Ghost, Link
- **States**: Default, Hover, Active, Disabled, Loading

**Primary Button**
```html
<button class="btn btn-primary">
    Learn More
</button>
```

```css
.btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-lg);
    border: none;
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: var(--fs-body);
    font-weight: var(--fw-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
}

.btn-primary {
    background: var(--color-primary);
    color: var(--color-white);
}

.btn-primary:hover {
    background: var(--color-primary-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.btn-primary:active {
    transform: translateY(0);
}
```

**Usage Guidelines:**
- Use primary buttons for main CTAs (Call to Action)
- Limit to 1-2 primary buttons per screen
- Secondary buttons for alternative actions
- Ghost buttons for tertiary actions

---

#### 2. Badges

**Variants:**
- Status badges (success, warning, error, info)
- Feature badges (free, paid, new, popular)
- Level badges (A1-C2, beginner, intermediate, advanced)

**Badge Component**
```html
<span class="badge badge-success">Free</span>
<span class="badge badge-level">A1-B2</span>
<span class="badge badge-new">New</span>
```

```css
.badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: var(--fw-semibold);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.badge-success {
    background: #E8F9E0;
    color: var(--color-success);
}

.badge-level {
    background: var(--primary-50);
    color: var(--color-primary);
}
```

**Usage Guidelines:**
- Use semantic colors for status
- Keep text concise (1-3 words)
- Use consistently across the site

---

#### 3. Input Fields

**Variants:**
- Text input
- Search input
- Select dropdown
- States: Default, Focus, Disabled, Error

**Text Input**
```html
<div class="input-group">
    <label for="search" class="input-label">Search</label>
    <input type="text"
           id="search"
           class="input-field"
           placeholder="Search languages...">
</div>
```

```css
.input-field {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 2px solid var(--color-gray-200);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: var(--fs-body);
    color: var(--color-dark);
    background: var(--color-white);
    transition: all var(--transition-base);
}

.input-field:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(91, 78, 140, 0.1);
}
```

---

#### 4. Icons

**System:**
- Emoji icons for language flags (🇳🇱 🇩🇰 🇵🇹)
- SVG icons for UI elements
- Icon sizes: 16px, 20px, 24px, 32px

**Usage Guidelines:**
- Use emoji flags for language identification
- SVG icons for interactive elements
- Maintain consistent stroke width (2px)
- Always provide accessible labels

---

### 🟢 MOLECULES

#### 1. Language Card

**Structure:** Flag + Name + Stats + Description + CTA

```html
<article class="language-card">
    <div class="card-header">
        <span class="card-flag">🇳🇱</span>
        <div class="card-title-area">
            <h3 class="card-title">Dutch</h3>
            <p class="card-subtitle">Nederlands</p>
        </div>
        <span class="badge badge-new">New</span>
    </div>

    <div class="card-stats">
        <div class="stat-item">
            <span class="stat-number">23M</span>
            <span class="stat-label">Speakers</span>
        </div>
        <div class="stat-item">
            <span class="stat-number">100+</span>
            <span class="stat-label">Resources</span>
        </div>
    </div>

    <p class="card-description">
        Discover comprehensive Dutch learning resources...
    </p>

    <a href="#dutch" class="card-cta">
        Explore Resources →
    </a>
</article>
```

```css
.language-card {
    background: var(--color-white);
    border: 1px solid var(--color-gray-100);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    transition: all var(--transition-base);
}

.language-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary);
}
```

---

#### 2. Resource Card

**Structure:** Name + URL + Features + Level + Free/Paid

```html
<div class="resource-card">
    <div class="language-badge">
        <span>🇳🇱</span>
        <span>Dutch</span>
    </div>

    <div class="card-header">
        <a href="..." class="resource-title">Duolingo</a>
    </div>

    <div class="resource-features">
        <span class="feature-item">Gamified learning</span>
        <span class="feature-item">Mobile app</span>
        <span class="feature-item">Community support</span>
    </div>

    <div class="resource-meta">
        <span class="meta-badge free">Free</span>
        <span class="meta-badge level">A1-B2</span>
    </div>
</div>
```

**Features Format:**
- 3-5 concise features per resource
- Each feature: 2-8 words
- Pipe-separated in display: `Feature 1 | Feature 2 | Feature 3`

---

#### 3. Filter Bar

**Components:** Language selector + Type filters + View toggle

```html
<div class="filter-section">
    <div class="filter-group">
        <label class="filter-label">Language:</label>
        <select id="language-select" class="language-select">
            <option value="all">🌐 All Languages</option>
            <option value="dutch">🇳🇱 Dutch</option>
        </select>
    </div>

    <div class="type-filters">
        <button class="type-filter active" data-type="all">
            <span class="type-filter-icon">📋</span>
            <span>All Types</span>
        </button>
        <button class="type-filter" data-type="courses">
            <span class="type-filter-icon">🎓</span>
            <span>Courses</span>
        </button>
    </div>
</div>
```

---

#### 4. Stats Box

**Structure:** Icon + Number + Label

```html
<div class="stat">
    <span class="stat-number" id="total-resources">2031</span>
    <span class="stat-label">Total Resources</span>
</div>
```

```css
.stat {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: var(--fw-bold);
    color: var(--color-primary);
    margin-bottom: 4px;
}

.stat-label {
    font-size: 0.85rem;
    color: var(--color-gray-500);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
```

---

### 🟣 ORGANISMS

#### 1. Navigation Bar

**Structure:** Logo + Menu + Mobile Toggle

```html
<nav class="nav">
    <div class="nav-container">
        <a href="#" class="nav-logo">
            <span class="logo-icon">🌍</span>
            <span class="logo-text">Language Hub</span>
        </a>

        <button class="nav-toggle" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <ul class="nav-menu">
            <li><a href="#languages" class="nav-link">Languages</a></li>
            <li><a href="resources.html" class="nav-link">Resources</a></li>
            <li><a href="about.html" class="nav-link">About</a></li>
        </ul>
    </div>
</nav>
```

**Behavior:**
- Fixed position on scroll
- Backdrop blur effect
- Mobile responsive with hamburger menu
- Smooth transitions

---

#### 2. Hero Section

**Structure:** Background + Title + Description + CTA + Features

```html
<header class="hero">
    <div class="hero-background">
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
    </div>

    <div class="hero-content">
        <h1 class="hero-title">
            <span class="hero-subtitle">Your journey to</span>
            <span class="hero-main">Linguistic Mastery</span>
            <span class="hero-accent">starts here</span>
        </h1>

        <p class="hero-description">
            A thoughtfully curated collection...
        </p>

        <div class="quick-search">
            <input type="text" class="search-input"
                   placeholder="Search languages...">
            <button class="search-button">🔍</button>
        </div>
    </div>
</header>
```

**Design Features:**
- Full viewport height (`100vh`)
- Layered gradient background
- Subtle pattern overlay
- Centered content
- Fade-in animation

---

#### 3. Language Grid

**Structure:** Grid of Language Cards

```html
<section class="languages-grid">
    <div class="grid-container">
        <!-- Language cards here -->
    </div>
</section>
```

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
}

@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
}
```

---

#### 4. Resources Section

**Structure:** Header + Filters + Grid + Pagination

```html
<section class="resources-by-type">
    <div class="type-section" id="courses-section">
        <div class="type-header">
            <span class="type-icon">🎓</span>
            <h2 class="type-title">Online Courses</h2>
            <span class="type-count">150 resources</span>
        </div>
        <div class="resources-grid">
            <!-- Resource cards here -->
        </div>
    </div>
</section>
```

---

## 💻 Code Standards

### HTML Standards

#### Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Language Learning Hub</title>
</head>
<body>
    <!-- Content -->
</body>
</html>
```

#### Semantic HTML
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Use `<button>` for interactive elements, not `<div>`
- Use proper heading hierarchy (`h1` → `h2` → `h3`)
- Always include `alt` text for images

#### Accessibility
- Include ARIA labels where appropriate
- Use semantic HTML elements
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG AA minimum)

---

### CSS Standards

#### File Organization
```
assets/css/
├── main.css              # Core styles
├── resources.css         # Resources page
├── language-filters.css  # Filter components
└── modern-ui-clean.css   # Modern UI enhancements
```

#### Naming Convention (BEM)
```css
/* Block */
.language-card { }

/* Element */
.language-card__title { }

/* Modifier */
.language-card--featured { }
```

#### Property Order
```css
.component {
    /* Positioning */
    position: relative;
    top: 0;
    z-index: 1;

    /* Box Model */
    display: flex;
    width: 100%;
    padding: var(--space-md);
    margin-bottom: var(--space-lg);

    /* Typography */
    font-family: var(--font-body);
    font-size: var(--fs-body);
    color: var(--color-dark);

    /* Visual */
    background: var(--color-white);
    border: 1px solid var(--color-gray-100);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);

    /* Animation */
    transition: all var(--transition-base);
}
```

#### Responsive Design
```css
/* Mobile First Approach */
.component {
    /* Mobile styles (default) */
}

@media (min-width: 768px) {
    .component {
        /* Tablet styles */
    }
}

@media (min-width: 1024px) {
    .component {
        /* Desktop styles */
    }
}
```

---

### JavaScript Standards

#### File Organization
```
assets/js/
├── data-simple.js        # Global languageData object
├── [language]-data.js    # Individual language data
├── resources-page.js     # Resources page logic
├── grid-manager.js       # Grid rendering
└── modern-ui-clean.js    # UI enhancements
```

#### Code Style

**Formatting:**
- 4-space indentation for object properties
- No ES6 modules (use traditional global objects)
- Semicolons required

**Example:**
```javascript
// Use traditional assignment pattern
const dutchResources = {
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    resources: {
        courses: [ /* ... */ ]
    }
};

// Register to global object
if (typeof languageData !== 'undefined') {
    languageData.dutch = dutchResources;
}
```

---

## 📊 Data Structure Standards

### Language Data Structure

```javascript
const [language]Resources = {
    name: "English Name",
    nativeName: "Native Name",
    flag: "🇫🇱",
    learners: "23M+",
    speakers: "23M native",
    highlights: [
        "Highlight 1",
        "Highlight 2",
        "Highlight 3"
    ],
    resources: {
        courses: [
            {
                category: "Category Name",
                items: [
                    {
                        name: "Resource Name",
                        url: "https://...",
                        features: ["Feature 1", "Feature 2", "Feature 3"],
                        free: true,
                        level: "A1-B2"
                    }
                ]
            }
        ],
        apps: [ /* same structure */ ],
        books: [ /* same structure */ ],
        audio: [ /* same structure */ ],
        practice: [ /* same structure */ ]
    }
};
```

### Features Guidelines

**Format:**
- Array of strings
- 3-5 features per resource
- Each feature: 2-8 words maximum
- Concise and meaningful
- No redundancy

**Good Examples:**
```javascript
features: [
    "A1-B2 levels",
    "University platform",
    "Certificate available",
    "Video exercises",
    "Tutor support"
]
```

**Bad Examples:**
```javascript
features: [
    "This is an E-learning portal by Studia Academica Slovaca (Comenius University) with A1-A2 levels", // TOO LONG
    "free", // Use the 'free' property instead
    "good", // Too vague
]
```

### Level Indicators

**Standard Formats:**
- CEFR: `A1`, `A2`, `B1`, `B2`, `C1`, `C2`, `A1-B2`, `A1-C2`
- Descriptive: `Beginner`, `Intermediate`, `Advanced`, `All levels`

---

## ♿ Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Color Contrast
- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

#### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators required
- Logical tab order

#### Screen Readers
- Proper semantic HTML
- ARIA labels where needed
- Alt text for images
- Skip navigation links

#### Testing Tools
- axe DevTools
- WAVE Browser Extension
- Lighthouse Accessibility Audit

---

## ⚡ Performance Standards

### Target Metrics

- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.8s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

### Optimization Techniques

**CSS:**
- Minimize unused CSS
- Use CSS custom properties
- Avoid deep nesting (max 3 levels)
- Combine media queries

**JavaScript:**
- Minimize DOM manipulation
- Debounce scroll/resize handlers
- Use event delegation
- Lazy load images

**Assets:**
- Optimize images (WebP format)
- Use system fonts when possible
- Minify CSS/JS for production
- Enable gzip/brotli compression

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-27 | Initial comprehensive style guide |

---

## 📝 Contributing

When updating this style guide:

1. Document the change in the version history
2. Update relevant sections
3. Add code examples
4. Include visual references
5. Review with the team

---

## 🎓 Resources

### Design Tools
- **Figma**: Design prototypes and mockups
- **Adobe Color**: Color palette generation
- **Google Fonts**: Typography selection

### Code Tools
- **VS Code**: Primary code editor
- **Chrome DevTools**: Debugging and testing
- **Lighthouse**: Performance auditing

### Testing Tools
- **axe DevTools**: Accessibility testing
- **BrowserStack**: Cross-browser testing
- **PageSpeed Insights**: Performance testing

---

**Made with ❤️ for language learners everywhere**
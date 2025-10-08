═══════════════════════════════════════════════════════
    AGENT OPERATING INSTRUCTIONS
    ALL DIRECTIVES ARE MANDATORY - STRICT COMPLIANCE
═══════════════════════════════════════════════════════

╔═══════════════════════════════════════════════════════╗
║ ⚠️  CRITICAL: SWARM ORCHESTRATION ARCHITECTURE  ⚠️     ║
║                                                       ║
║ MANDATORY COORDINATION PATTERN:                      ║
║ → Topology Setup: Use Claude Flow's MCP (Model       ║
║   Context Protocol) coordination for establishing    ║
║   agent topology and communication patterns          ║
║ → Agent Execution: Use Task tool for actual agent    ║
║   execution, following guidelines in CLAUDE.md       ║
║ → Separation of Concerns: ALWAYS distinguish between ║
║   orchestration layer (Flow/MCP) and execution       ║
║   layer (Task tool)                                  ║
║                                                       ║
║ This pattern must be followed for ALL multi-agent    ║
║ coordination and swarm operations without exception. ║
╚═══════════════════════════════════════════════════════╝

[MANDATORY-1] COMMUNICATION & TRANSPARENCY
→ Explain every action in detail as you perform it
→ Include: what you're doing, why, expected outcomes, context, and rationale
→ Maximize thought exposure: make reasoning visible and understandable

[MANDATORY-2] PROFESSIONAL COMMUNICATION STYLE
→ Avoid sycophancy: Don't over-praise, over-agree, or use excessive enthusiasm
→ Maintain neutral, professional tone: Be direct, clear, and objective
→ Give honest assessments: Point out potential issues, trade-offs, and concerns
→ Don't over-apologize: Acknowledge errors once, then move forward with solutions
→ Challenge when appropriate: Question assumptions and suggest alternatives constructively
→ Skip unnecessary pleasantries: Get to the point efficiently
→ Be appropriately critical: Identify flaws, risks, and weaknesses without sugar-coating
→ Avoid hedging excessively: State things directly unless genuinely uncertain
→ No false validation: Don't agree with problematic ideas just to be agreeable
→ Professional candor over politeness: Prioritize clarity and usefulness over niceties

[MANDATORY-3] VERSION CONTROL & DOCUMENTATION
→ Commit frequently to local and remote repositories
→ Write clear, meaningful commit messages for all changes

[MANDATORY-4] TARGET AUDIENCE & SCOPE
→ Primary user: Individual use (requestor)
→ Future scope: Multi-user, public open-source or paid offering
→ Current priority: Build meaningful, functional features first

[MANDATORY-5] CLARIFICATION PROTOCOL
→ Stop and ask questions when:
  • Instructions unclear or ambiguous
  • Uncertain about requirements or approach
  • Insufficient information for intelligent decisions
  • Multiple valid paths exist

[MANDATORY-6] SWARM ORCHESTRATION APPROACH
→ Topology setup: Use Claude Flow's MCP (Model Context Protocol) coordination for establishing agent topology and communication patterns
→ Agent execution: Use Task tool for actual agent execution, following guidelines specified in CLAUDE.md
→ Separation of concerns: Distinguish between orchestration layer (Flow/MCP) and execution layer (Task tool)

[MANDATORY-7] ERROR HANDLING & RESILIENCE
→ Implement graceful error handling with clear error messages
→ Log errors with context for debugging
→ Validate inputs and outputs at boundaries
→ Provide fallback strategies when operations fail
→ Never fail silently; always surface issues appropriately

[MANDATORY-8] TESTING & QUALITY ASSURANCE
→ Write tests for critical functionality before considering work complete
→ Verify changes work as expected before committing
→ Document test cases and edge cases considered
→ Run existing tests to ensure no regressions

[MANDATORY-9] SECURITY & PRIVACY
→ Never commit secrets, API keys, or sensitive credentials
→ Use environment variables for configuration
→ Sanitize user inputs to prevent injection attacks
→ Consider data privacy implications for future multi-user scenarios
→ Follow principle of least privilege

[MANDATORY-10] ARCHITECTURE & DESIGN
→ Favor simple, readable solutions over clever complexity
→ Design for modularity and reusability from the start
→ Document architectural decisions and trade-offs
→ Consider future extensibility without over-engineering
→ Apply SOLID principles and appropriate design patterns

[MANDATORY-11] INCREMENTAL DELIVERY
→ Break large tasks into small, deployable increments
→ Deliver working functionality frequently (daily if possible)
→ Each commit should leave the system in a working state
→ Prioritize MVP features over perfect implementations
→ Iterate based on feedback and learnings

[MANDATORY-12] DOCUMENTATION STANDARDS
→ Update README.md as features are added
→ Document "why" decisions were made, not just "what"
→ Include setup instructions, dependencies, and usage examples
→ Maintain API documentation for all public interfaces
→ Document known limitations and future considerations

[MANDATORY-13] DEPENDENCY MANAGEMENT
→ Minimize external dependencies; evaluate necessity
→ Pin dependency versions for reproducibility
→ Document why each major dependency was chosen
→ Regularly review and update dependencies for security

[MANDATORY-14] PERFORMANCE AWARENESS
→ Profile before optimizing; avoid premature optimization
→ Consider scalability implications of design choices
→ Document performance characteristics and bottlenecks
→ Optimize for readability first, performance second (unless critical)

[MANDATORY-15] STATE MANAGEMENT
→ Make state transitions explicit and traceable
→ Validate state consistency at critical points
→ Consider idempotency for operations that might retry
→ Document state machine behavior where applicable

[MANDATORY-16] CONTINUOUS LEARNING & IMPROVEMENT
→ Document what worked and what didn't after completing tasks
→ Identify patterns in errors and user requests
→ Suggest process improvements based on observed inefficiencies
→ Build reusable solutions from recurring problems
→ Maintain a decision log for complex choices

[MANDATORY-17] OBSERVABILITY & MONITORING
→ Log key operations with appropriate detail levels
→ Track performance metrics for critical operations
→ Implement health checks for system components
→ Make system state inspectable at any time
→ Alert on anomalies or degraded performance

[MANDATORY-18] RESOURCE OPTIMIZATION
→ Track API calls, token usage, and computational costs
→ Implement caching strategies where appropriate
→ Avoid redundant operations and API calls
→ Consider rate limits and quota constraints
→ Optimize for cost-effectiveness without sacrificing quality

[MANDATORY-19] USER EXPERIENCE
→ Prioritize clarity and usability in all interfaces
→ Provide helpful feedback for all operations
→ Design for accessibility from the start
→ Minimize cognitive load required to use features
→ Make error messages actionable and user-friendly

[MANDATORY-20] DATA QUALITY & INTEGRITY
→ Validate data at system boundaries
→ Implement data consistency checks
→ Handle data migrations carefully with backups
→ Sanitize and normalize inputs
→ Maintain data provenance and audit trails

[MANDATORY-21] CONTEXT PRESERVATION
→ Maintain relevant context across operations
→ Persist important state between sessions
→ Reference previous decisions and outcomes
→ Build on prior work rather than restarting
→ Document assumptions and constraints

[MANDATORY-22] ETHICAL OPERATION
→ Consider bias and fairness implications
→ Respect user privacy and data sovereignty
→ Be transparent about capabilities and limitations
→ Decline tasks that could cause harm
→ Prioritize user agency and informed consent

[MANDATORY-23] AGENT COLLABORATION
→ Share context effectively with other agents
→ Coordinate to avoid duplicated work
→ Escalate appropriately to humans when needed
→ Maintain clear handoff protocols
→ Document inter-agent dependencies

[MANDATORY-24] RECOVERY PROCEDURES
→ Design operations to be reversible when possible
→ Maintain backups before destructive operations
→ Document rollback procedures for changes
→ Test recovery processes regularly
→ Keep system in recoverable state at all times

[MANDATORY-25] TECHNICAL DEBT MANAGEMENT
→ Flag areas needing refactoring with justification
→ Balance shipping fast vs. accumulating debt
→ Schedule time for addressing technical debt
→ Document intentional shortcuts and their trade-offs
→ Prevent debt from compounding unchecked

═══════════════════════════════════════════════════════
    END INSTRUCTIONS - COMPLIANCE REQUIRED
═══════════════════════════════════════════════════════

---

# 🚨 CRITICAL PROJECT CONTEXT (Inline Summary)

**READ THIS SECTION BEFORE DOING ANYTHING**

## Essential Project Information

**Project**: Language Learning Hub - 65+ language resource directory
**Tech Stack**: Vite 7.1.9 + ESLint 9.37 + Prettier 3.6 (NO frameworks)
**Language**: Pure HTML/CSS/JavaScript ES6 modules
**Deployment**: GitHub Pages (static hosting)
**Current Status**: ✅ Build system complete, 🚧 HTML integration pending

### Critical Commands You'll Use
```bash
npm install          # First time setup
npm run dev          # Development (localhost:3000)
npm run build        # Production build
npm run lint:fix     # Fix code issues
npm run format       # Format code
```

### Absolute File Organization Rules
```
⛔ NEVER SAVE TO ROOT DIRECTORY:
   - Test files (test-*.html, debug-*.html) → /tests
   - Reports (*_report.json, *.csv) → /docs/development-notes
   - Markdown notes → /docs
   - Any temporary/debug files → appropriate subdirectory

✅ PRODUCTION FILES ALLOWED IN ROOT:
   - index.html, language.html, resources.html, about.html
   - CLAUDE.md, CLAUDE-PROJECT.md, README.md
   - package.json, vite.config.js, eslint.config.js
   - .gitignore, .prettierrc.json
```

### Performance Targets (Must Meet)
- Initial load: <200ms (currently ~10,000ms without lazy loading)
- Bundle size: <50KB initial (currently ~850KB)
- Use lazy loading for language data (67 modules)

### Current Architecture
- 67 language data files as ES6 modules (export/import)
- Dynamic import system built (language-loader.js)
- Loading UI system built (loading-ui.js)
- **Pending**: Wire lazy loader to HTML files

### Build System Facts
- Bundler: Vite (NOT Webpack)
- Code splitting: Each language = separate chunk
- Minification: Terser (removes console.log in production)
- Entry points: 4 HTML files (index, language, resources, about)

---

# 📖 Detailed Documentation References

## ⚡ Keyword Triggers → Required Reading

**When you see these keywords in user requests, read the corresponding file FIRST:**

| Keywords in Request | Read This File | Why |
|---------------------|----------------|-----|
| **build**, **vite**, **bundle**, **optimization** | `docs/BUILD_SYSTEM_GUIDE.md` | Build system details |
| **architecture**, **design**, **pattern**, **trade-off** | `docs/ARCHITECTURE.md` | Technical design decisions |
| **deploy**, **release**, **publish**, **production** | `docs/DEPLOYMENT.md` | Deployment procedures |
| **commit**, **git**, **workflow**, **style guide** | `docs/DEVELOPMENT.md` | Development standards |
| **performance**, **slow**, **optimize**, **speed** | `docs/ARCHITECTURE.md` (performance section) | Performance architecture |
| **test**, **testing**, **quality**, **lint** | `docs/DEVELOPMENT.md` (testing section) | Testing guidelines |
| **structure**, **organization**, **files**, **directories** | `CLAUDE-PROJECT.md` (structure section) | File organization |

## 📋 Condensed File Summaries

### CLAUDE-PROJECT.md (450 lines) - **READ AT SESSION START**
**Summary**: Complete project configuration reference
- Tech stack: Vite 7.1.9, ESLint, Prettier, pure JS (no frameworks)
- Project structure: Root = production files only, tests in /tests
- npm scripts: dev, build, preview, lint, format
- Performance targets: <200ms load, <50KB bundle
- Security: No secrets in repo, sanitize inputs, env vars
- Status: Build system ✅, HTML integration pending 🚧
- Roadmap: Lazy loading integration → search → more languages

**When to Read**: Every new session start (MANDATORY-26)

### docs/ARCHITECTURE.md (506 lines)
**Summary**: Technical design and architectural decisions
- System diagrams: Static site with client-side lazy loading
- Components: LanguageLoader (singleton), LoadingUI (singleton), main.js (module)
- Data flow: Static files → Dynamic import → Cache (Map) → DOM
- Patterns: Module, Singleton, Factory, Observer, Cache-Aside
- Decisions: Vanilla JS (not React), Vite (not Webpack), lazy loading, GitHub Pages
- Performance: Manual chunking, 67 separate language bundles
- Security: Input sanitization, HTTPS, dependency audits

**When to Read**:
- Making architectural decisions
- Understanding system design
- Performance optimization
- Technology choice questions

### docs/DEVELOPMENT.md (754 lines)
**Summary**: Development workflow and coding standards
- Setup: Node 20.19+, npm install, npm run dev
- Scripts: dev (port 3000), build, preview (port 4173), lint, format
- Code style: Module pattern, async/await, ES6 modules, JSDoc for public APIs
- File naming: kebab-case for all files
- Import style: Relative paths with .js extension required
- Git commits: Conventional commits (type: subject)
- Testing: Manual currently, automated planned (Jest/Vitest)
- Debugging: Chrome DevTools, console groups, network tab

**When to Read**:
- Writing code (style guidelines)
- Git workflow questions
- Testing procedures
- Debugging issues

### docs/DEPLOYMENT.md (514 lines)
**Summary**: Deployment procedures and monitoring
- Platform: GitHub Pages (free static hosting)
- Process: npm run build → git push → auto-deploy
- Pre-deploy: Lint, format, build test, manual testing
- Base path: /online_language_learning_resources/ (must match repo name)
- Rollback: git revert or git reset, force push
- Future: GitHub Actions for automated CI/CD
- Monitoring: Lighthouse scores, Web Vitals (planned)

**When to Read**:
- Deploying to production
- Build/deployment issues
- Rollback scenarios
- Setting up CI/CD

### docs/BUILD_SYSTEM_GUIDE.md (450 lines - Existing)
**Summary**: Build system implementation guide
- What's complete: Vite config, ESLint, Prettier, lazy loading infrastructure
- What remains: HTML integration (remove 67 script tags, wire lazy loader)
- Performance impact: 98% faster load projected
- Integration steps: Detailed instructions for HTML changes
- Troubleshooting: Common build issues and solutions

**When to Read**:
- Build configuration questions
- HTML integration work
- Vite-specific issues
- Performance optimization

---

## 🎯 Common Task → Documentation Map

**For quick reference, match your task to the documentation:**

### Code Changes
```
Task: "Add a new feature"
→ Read: docs/DEVELOPMENT.md (coding standards)
→ Check: docs/ARCHITECTURE.md (design patterns to use)
→ Verify: npm run lint && npm run build
```

### Bug Fixes
```
Task: "Fix this error/bug"
→ Read: docs/DEVELOPMENT.md (debugging techniques)
→ Check: Browser console, Network tab
→ Verify: npm run lint:fix && npm run build
```

### Performance Work
```
Task: "Make it faster" / "Optimize"
→ Read: docs/ARCHITECTURE.md (performance section)
→ Read: docs/BUILD_SYSTEM_GUIDE.md (optimization strategies)
→ Profile: Chrome DevTools Performance tab BEFORE changes
→ Verify: Lighthouse score after changes
```

### Deployment
```
Task: "Deploy" / "Push to production"
→ Read: docs/DEPLOYMENT.md (complete checklist)
→ Verify: npm run build succeeds
→ Test: npm run preview
→ Deploy: git push origin main
```

### File Organization
```
Task: "Where should I save this file?"
→ Check: Inline rules above (NEVER save test/debug to root)
→ Read: CLAUDE-PROJECT.md (file structure)
→ Rule: Production files in root, dev files in subdirectories
```

---

# Additional Documentation References

## Session Initialization (MANDATORY-26 Compliance)

1. ✅ **CLAUDE.md** (This file) - Auto-loaded by Claude Code
   - Contains all 25 mandatory directives
   - You are reading this now

2. 🔴 **IMMEDIATELY READ**: `CLAUDE-PROJECT.md`
   - **REQUIRED**: Read this file at the START of EVERY session
   - **BEFORE**: Starting any task or answering any question
   - **PURPOSE**: Essential project context, tech stack, file structure
   - **ACTION**: Use the Read tool to read CLAUDE-PROJECT.md now

3. 📖 **READ AS NEEDED**: Specific documentation for your task
   - `docs/ARCHITECTURE.md` - For design decisions
   - `docs/DEVELOPMENT.md` - For coding/workflow tasks
   - `docs/DEPLOYMENT.md` - For deployment tasks

**WHY THIS MATTERS**: Claude Code only auto-loads CLAUDE.md. The other files contain critical project-specific context that you must explicitly read. Skipping CLAUDE-PROJECT.md will result in uninformed decisions.

---

**At session start**: Read CLAUDE-PROJECT.md per MANDATORY-26

**Documentation hierarchy**:
```
CLAUDE.md (This File)
  ├── 26 Universal mandatory directives
  ├── Critical project context (inline above)
  ├── Keyword triggers for reading specific docs
  └── Condensed summaries of all documentation

Reference Documentation (Read when triggered):
  ├── CLAUDE-PROJECT.md (450 lines) - Session start
  ├── docs/ARCHITECTURE.md (506 lines) - Design decisions
  ├── docs/DEVELOPMENT.md (754 lines) - Coding/workflow
  ├── docs/DEPLOYMENT.md (514 lines) - Deployment
  └── docs/BUILD_SYSTEM_GUIDE.md (450 lines) - Build system
```

---

## Critical Rules Summary (Most Important Directives)

**File Organization** (MANDATORY-11):
- ⛔ **Never** save test/debug/report files to root directory
- ✅ Tests → `/tests`
- ✅ Reports → `/docs/development-notes`
- ✅ Documentation → `/docs`

**Commit Standards** (MANDATORY-3):
- Commit frequently
- Use conventional commit format: `type: subject`
- Include footer: `🤖 Generated with [Claude Code]...`

**Code Quality** (MANDATORY-8, MANDATORY-10):
- Run `npm run lint` before committing
- Run `npm run format` for consistency
- Verify `npm run build` succeeds
- Test changes in browser

**Performance** (MANDATORY-14):
- Target: <200ms initial load, <50KB initial bundle
- Use lazy loading for language data
- Profile before optimizing

---

## Project Status

**Version**: 2.0.0 (Production Build System)
**Last Updated**: 2025-10-07
**Status**: ✅ Build System Complete, 🚧 HTML Integration Pending

**Quick Start**:
```bash
npm install
npm run dev      # http://localhost:3000
```

For complete details, see `CLAUDE-PROJECT.md`.

---

**Document Version**: 1.1.0
**Directives Version**: 1.1 (25 directives)

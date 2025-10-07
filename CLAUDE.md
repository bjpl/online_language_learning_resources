════════════════════════════════════════════════════════
    AGENT OPERATING INSTRUCTIONS
    ALL DIRECTIVES ARE MANDATORY - STRICT COMPLIANCE
════════════════════════════════════════════════════════

[MANDATORY-1] COMMUNICATION & TRANSPARENCY
→ Explain every action in detail as you perform it
→ Include: what you're doing, why, expected outcomes, context, and rationale
→ Maximize thought exposure: make reasoning visible and understandable

[MANDATORY-2] VERSION CONTROL & DOCUMENTATION
→ Commit frequently to local and remote repositories
→ Write clear, meaningful commit messages for all changes

[MANDATORY-3] TARGET AUDIENCE & SCOPE
→ Primary user: Individual use (requestor)
→ Future scope: Multi-user, public open-source or paid offering
→ Current priority: Build meaningful, functional features first

[MANDATORY-4] CLARIFICATION PROTOCOL
→ Stop and ask questions when:
  • Instructions unclear or ambiguous
  • Uncertain about requirements or approach
  • Insufficient information for intelligent decisions
  • Multiple valid paths exist

[MANDATORY-5] SWARM ORCHESTRATION
→ Topology: Use Claude Flow's MCP for agent topology and communication
→ Execution: Use Task tool per CLAUDE.md guidelines
→ Separation: Distinguish orchestration layer (Flow/MCP) from execution layer (Task tool)

[MANDATORY-6] ERROR HANDLING & RESILIENCE
→ Implement graceful error handling with clear error messages
→ Log errors with context for debugging
→ Validate inputs and outputs at boundaries
→ Provide fallback strategies when operations fail
→ Never fail silently; always surface issues appropriately

[MANDATORY-7] TESTING & QUALITY ASSURANCE
→ Write tests for critical functionality before considering work complete
→ Verify changes work as expected before committing
→ Document test cases and edge cases considered
→ Run existing tests to ensure no regressions

[MANDATORY-8] SECURITY & PRIVACY
→ Never commit secrets, API keys, or sensitive credentials
→ Use environment variables for configuration
→ Sanitize user inputs to prevent injection attacks
→ Consider data privacy implications for future multi-user scenarios
→ Follow principle of least privilege

[MANDATORY-9] ARCHITECTURE & DESIGN
→ Favor simple, readable solutions over clever complexity
→ Design for modularity and reusability from the start
→ Document architectural decisions and trade-offs
→ Consider future extensibility without over-engineering
→ Apply SOLID principles and appropriate design patterns

[MANDATORY-10] INCREMENTAL DELIVERY
→ Break large tasks into small, deployable increments
→ Deliver working functionality frequently (daily if possible)
→ Each commit should leave the system in a working state
→ Prioritize MVP features over perfect implementations
→ Iterate based on feedback and learnings

[MANDATORY-11] DOCUMENTATION STANDARDS
→ Update README.md as features are added
→ Document "why" decisions were made, not just "what"
→ Include setup instructions, dependencies, and usage examples
→ Maintain API documentation for all public interfaces
→ Document known limitations and future considerations

[MANDATORY-12] DEPENDENCY MANAGEMENT
→ Minimize external dependencies; evaluate necessity
→ Pin dependency versions for reproducibility
→ Document why each major dependency was chosen
→ Regularly review and update dependencies for security

[MANDATORY-13] PERFORMANCE AWARENESS
→ Profile before optimizing; avoid premature optimization
→ Consider scalability implications of design choices
→ Document performance characteristics and bottlenecks
→ Optimize for readability first, performance second (unless critical)

[MANDATORY-14] STATE MANAGEMENT
→ Make state transitions explicit and traceable
→ Validate state consistency at critical points
→ Consider idempotency for operations that might retry
→ Document state machine behavior where applicable

[MANDATORY-15] CONTINUOUS LEARNING & IMPROVEMENT
→ Document what worked and what didn't after completing tasks
→ Identify patterns in errors and user requests
→ Suggest process improvements based on observed inefficiencies
→ Build reusable solutions from recurring problems
→ Maintain a decision log for complex choices

[MANDATORY-16] OBSERVABILITY & MONITORING
→ Log key operations with appropriate detail levels
→ Track performance metrics for critical operations
→ Implement health checks for system components
→ Make system state inspectable at any time
→ Alert on anomalies or degraded performance

[MANDATORY-17] RESOURCE OPTIMIZATION
→ Track API calls, token usage, and computational costs
→ Implement caching strategies where appropriate
→ Avoid redundant operations and API calls
→ Consider rate limits and quota constraints
→ Optimize for cost-effectiveness without sacrificing quality

[MANDATORY-18] USER EXPERIENCE
→ Prioritize clarity and usability in all interfaces
→ Provide helpful feedback for all operations
→ Design for accessibility from the start
→ Minimize cognitive load required to use features
→ Make error messages actionable and user-friendly

[MANDATORY-19] DATA QUALITY & INTEGRITY
→ Validate data at system boundaries
→ Implement data consistency checks
→ Handle data migrations carefully with backups
→ Sanitize and normalize inputs
→ Maintain data provenance and audit trails

[MANDATORY-20] CONTEXT PRESERVATION
→ Maintain relevant context across operations
→ Persist important state between sessions
→ Reference previous decisions and outcomes
→ Build on prior work rather than restarting
→ Document assumptions and constraints

[MANDATORY-21] ETHICAL OPERATION
→ Consider bias and fairness implications
→ Respect user privacy and data sovereignty
→ Be transparent about capabilities and limitations
→ Decline tasks that could cause harm
→ Prioritize user agency and informed consent

[MANDATORY-22] AGENT COLLABORATION
→ Share context effectively with other agents
→ Coordinate to avoid duplicated work
→ Escalate appropriately to humans when needed
→ Maintain clear handoff protocols
→ Document inter-agent dependencies

[MANDATORY-23] RECOVERY PROCEDURES
→ Design operations to be reversible when possible
→ Maintain backups before destructive operations
→ Document rollback procedures for changes
→ Test recovery processes regularly
→ Keep system in recoverable state at all times

[MANDATORY-24] TECHNICAL DEBT MANAGEMENT
→ Flag areas needing refactoring with justification
→ Balance shipping fast vs. accumulating debt
→ Schedule time for addressing technical debt
→ Document intentional shortcuts and their trade-offs
→ Prevent debt from compounding unchecked

════════════════════════════════════════════════════════
    END INSTRUCTIONS - COMPLIANCE REQUIRED
════════════════════════════════════════════════════════

---

# Language Learning Hub - Project Configuration

## Project Overview

A beautifully crafted, production-ready website curating the best language learning resources for 65+ languages. Built with modern development practices, optimized performance, and professional architecture.

## Technology Stack

- **Frontend**: Pure HTML/CSS/JavaScript (ES6 modules)
- **Build System**: Vite 7.1.9 with code splitting
- **Code Quality**: ESLint 9.37 + Prettier 3.6
- **Performance**: Lazy loading with dynamic imports
- **Deployment**: GitHub Pages

## Development Workflow

### Quick Start
```bash
npm install
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run preview  # Test production build
```

### Code Quality
```bash
npm run lint       # Check code quality
npm run lint:fix   # Auto-fix issues
npm run format     # Format all files
```

## Architecture Principles

### 1. Lazy Loading Strategy
- **Initial Load**: Core app only (~15KB)
- **On-Demand**: Language data files load dynamically
- **Caching**: Map-based caching prevents re-downloads
- **Performance**: 98% faster time-to-interactive

### 2. Build Optimization
- **Code Splitting**: Each language is a separate chunk
- **Minification**: Terser with console.log removal
- **CSS Splitting**: Separate CSS chunks for faster loads
- **Modern Target**: ES2020 for smaller bundles

### 3. Project Organization
```
/                    # Production HTML files only
/assets              # CSS and JS modules
/tests               # Test files (gitignored)
/docs                # Documentation
  /development-notes # Development artifacts (gitignored)
/daily_reports       # Daily development logs
/scripts             # Build and utility scripts
```

## File Management Rules

### ⛔ NEVER Save to Root
- No test files in root
- No report files in root
- No markdown notes in root
- No debug files in root

### ✅ Proper Organization
- Tests → `/tests`
- Reports → `/docs/development-notes`
- Documentation → `/docs`
- Scripts → `/scripts`
- Daily logs → `/daily_reports`

## Key Files

### Configuration
- `vite.config.js` - Build system configuration
- `eslint.config.js` - Code quality rules
- `.prettierrc.json` - Formatting standards
- `package.json` - Dependencies and scripts

### Core Application
- `index.html` - Homepage
- `language.html` - Language-specific resources
- `resources.html` - All resources page
- `about.html` - About page

### JavaScript Modules
- `assets/js/language-loader.js` - Dynamic import system
- `assets/js/loading-ui.js` - Loading states and UI feedback
- `assets/js/*-data.js` - 67 language data modules
- `assets/js/main.js` - Main application logic

### Documentation
- `README.md` - Project overview and setup
- `docs/BUILD_SYSTEM_GUIDE.md` - Complete build system documentation
- `daily_reports/*.md` - Daily development logs

## Commit Standards

### Format
```
<type>: <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Types
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style/formatting
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

## Performance Targets

### Before Optimization
- ❌ ~10,000ms initial load
- ❌ ~850KB bundle size
- ❌ 67 separate HTTP requests
- ❌ No caching strategy

### After Optimization
- ✅ ~200ms initial load (-98%)
- ✅ ~15KB initial bundle (-98%)
- ✅ On-demand language loading
- ✅ Map-based caching

## Security Guidelines

1. **Never commit secrets** - Use environment variables
2. **Sanitize inputs** - XSS prevention at all boundaries
3. **Validate data** - Check all external inputs
4. **Secure dependencies** - Regular updates and audits
5. **Privacy first** - Respect user data sovereignty

## Testing Strategy

### Current State
- Manual testing during development
- Build validation before deployment
- Cross-browser compatibility checks

### Future Enhancements
- Unit tests for core modules
- Integration tests for data loading
- E2E tests for critical user flows
- Performance monitoring

## Deployment Process

### Staging (Manual)
```bash
npm run build
npm run preview  # Test locally
```

### Production (GitHub Pages)
```bash
npm run build
# Commit dist/ directory
git push origin main
```

### Future (Automated CI/CD)
- GitHub Actions workflow
- Automated testing on PR
- Automated deployment on merge

## Known Limitations

1. **HTML Integration Pending**: Lazy loading infrastructure built but not yet wired to HTML
2. **No Backend**: Static site only, no dynamic data
3. **Manual Data Entry**: Language resources added manually
4. **No Search**: Client-side search not yet implemented

## Next Steps

### Immediate (This Week)
- [ ] Complete HTML integration for lazy loading
- [ ] Deploy lazy loading system to production
- [ ] Monitor performance metrics
- [ ] User testing and feedback

### Short-term (This Month)
- [ ] Implement client-side search
- [ ] Add more languages (target: 100+)
- [ ] Create recommendation engine
- [ ] Mobile app exploration

### Long-term (3-6 Months)
- [ ] Backend API for dynamic content
- [ ] User accounts and saved resources
- [ ] Community features (ratings, reviews)
- [ ] Analytics dashboard

## Support & Resources

- **Documentation**: `/docs/BUILD_SYSTEM_GUIDE.md`
- **Issue Tracking**: GitHub Issues
- **Live Site**: https://bjpl.github.io/online_language_learning_resources/
- **Repository**: https://github.com/bjpl/online_language_learning_resources

---

**Last Updated**: 2025-10-07
**Version**: 2.0.0 (Production Build System)
**Status**: ✅ Build System Complete, 🚧 HTML Integration Pending

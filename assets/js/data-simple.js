// ===================================
// Language Data - Global Initialization
// ===================================

// Initialize global languageData object
// Individual language data files will populate this object
// Make it truly global by attaching to window (works in both regular scripts and modules)
// eslint-disable-next-line no-unused-vars -- Used by individual language files to populate data
const languageData = {};
window.languageData = languageData;
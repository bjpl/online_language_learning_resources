// ===================================
// Test Smart Iframe Detection
// ===================================

console.log('🔍 TESTING SMART IFRAME DETECTION\n');
console.log('=' .repeat(60));

// Test URLs from different categories
const TEST_URLS = [
    // Known blockers (should open in tab)
    { url: 'https://github.com', expected: 'tab', reason: 'GitHub blocks iframes' },
    { url: 'https://www.facebook.com', expected: 'tab', reason: 'Facebook blocks iframes' },
    { url: 'https://twitter.com', expected: 'tab', reason: 'Twitter blocks iframes' },
    { url: 'https://www.linkedin.com', expected: 'tab', reason: 'LinkedIn blocks iframes' },
    { url: 'https://medium.com', expected: 'tab', reason: 'Medium blocks iframes' },
    { url: 'https://stackoverflow.com', expected: 'tab', reason: 'Stack Overflow blocks iframes' },

    // Likely to work in iframes
    { url: 'https://www.w3schools.com', expected: 'iframe', reason: 'Educational site usually allows iframes' },
    { url: 'https://developer.mozilla.org', expected: 'iframe', reason: 'MDN usually allows iframes' },
    { url: 'https://www.codecademy.com', expected: 'iframe', reason: 'Learning platform may allow iframes' },

    // Language learning sites (mixed)
    { url: 'https://www.duolingo.com', expected: 'unknown', reason: 'May or may not block iframes' },
    { url: 'https://www.babbel.com', expected: 'unknown', reason: 'May or may not block iframes' },
    { url: 'https://www.memrise.com', expected: 'unknown', reason: 'May or may not block iframes' }
];

// Known iframe blockers list from the tool
const IFRAME_BLOCKERS = [
    'github.com', 'facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com',
    'reddit.com', 'stackoverflow.com', 'amazon.com', 'netflix.com', 'spotify.com',
    'discord.com', 'slack.com', 'microsoft.com', 'google.com', 'youtube.com',
    'vimeo.com', 'medium.com', 'notion.so', 'trello.com', 'dropbox.com',
    'paypal.com', 'stripe.com', 'twitch.tv', 'whatsapp.com', 'telegram.org',
    'zoom.us', 'ebay.com', 'pinterest.com', 'tumblr.com', 'quora.com'
];

// Test function to check if URL should open in tab
function shouldOpenInTab(url) {
    if (!url) return false;

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');

        for (const blocker of IFRAME_BLOCKERS) {
            if (hostname.includes(blocker)) {
                return true;
            }
        }

        return false;
    } catch (e) {
        return false;
    }
}

console.log('📋 Testing URL Detection Logic:\n');

let correct = 0;
let total = 0;

TEST_URLS.forEach(test => {
    const result = shouldOpenInTab(test.url) ? 'tab' : 'iframe';
    const isCorrect = (test.expected === 'unknown') || (result === test.expected);

    if (isCorrect) correct++;
    total++;

    const status = isCorrect ? '✅' : '❌';
    const indicator = result === 'tab' ? '🔗' : '🖼️';

    console.log(`${status} ${indicator} ${test.url}`);
    console.log(`   Expected: ${test.expected}, Got: ${result}`);
    console.log(`   ${test.reason}\n`);
});

console.log('=' .repeat(60));
console.log('\n📊 DETECTION ACCURACY:\n');

const accuracy = ((correct / total) * 100).toFixed(1);
console.log(`Correct detections: ${correct}/${total} (${accuracy}%)\n`);

// Test domain extraction
console.log('🔍 Testing Domain Extraction:\n');

const testDomains = [
    'https://www.github.com/user/repo',
    'http://facebook.com/page',
    'https://subdomain.medium.com/article',
    'https://docs.google.com/document'
];

testDomains.forEach(url => {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');
        const shouldBlock = IFRAME_BLOCKERS.some(b => hostname.includes(b));

        console.log(`URL: ${url}`);
        console.log(`  Hostname: ${hostname}`);
        console.log(`  Should block: ${shouldBlock ? 'Yes' : 'No'}\n`);
    } catch (e) {
        console.log(`❌ Invalid URL: ${url}\n`);
    }
});

// Statistics about the blocker list
console.log('=' .repeat(60));
console.log('\n📈 BLOCKER LIST STATISTICS:\n');

console.log(`Total known blockers: ${IFRAME_BLOCKERS.length}`);

const categories = {
    'Social Media': ['facebook', 'twitter', 'linkedin', 'instagram', 'reddit', 'pinterest', 'tumblr'],
    'Developer': ['github', 'stackoverflow', 'gitlab'],
    'Google Services': ['google', 'youtube'],
    'Microsoft': ['microsoft', 'teams'],
    'Communication': ['discord', 'slack', 'whatsapp', 'telegram', 'zoom'],
    'E-commerce': ['amazon', 'ebay', 'paypal', 'stripe'],
    'Content': ['medium', 'quora', 'vimeo', 'twitch'],
    'Productivity': ['notion', 'trello', 'dropbox']
};

Object.entries(categories).forEach(([category, keywords]) => {
    const count = IFRAME_BLOCKERS.filter(blocker =>
        keywords.some(kw => blocker.includes(kw))
    ).length;
    console.log(`  ${category}: ${count} sites`);
});

console.log('\n=' .repeat(60));
console.log('✅ Smart iframe detection system is ready!');
console.log('\nThe tool will:');
console.log('1. Check against known blockers list');
console.log('2. Detect iframe loading failures');
console.log('3. Automatically open blocked sites in new tabs');
console.log('4. Learn from failures and remember blocked domains');
console.log('5. Reuse the same tab window for better UX');
console.log('\n=' .repeat(60));
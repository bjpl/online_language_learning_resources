const fs = require('fs');
const content = fs.readFileSync('assets/js/hindi-data.js', 'utf8');

let openBraces = 0;
let openBrackets = 0;
let inString = false;
let stringChar = null;

for(let i = 0; i < content.length; i++) {
  const char = content[i];
  const prevChar = i > 0 ? content[i-1] : '';

  // Handle strings
  if (!inString && (char === '"' || char === "'")) {
    inString = true;
    stringChar = char;
  } else if (inString && char === stringChar && prevChar !== '\\') {
    inString = false;
    stringChar = null;
  }

  // Count braces/brackets outside strings
  if (!inString) {
    if (char === '{') openBraces++;
    if (char === '}') openBraces--;
    if (char === '[') openBrackets++;
    if (char === ']') openBrackets--;

    if (openBraces < 0) {
      console.log('Extra closing brace } at position', i);
      console.log('Context:', content.substring(i-50, i+50));
      break;
    }
    if (openBrackets < 0) {
      console.log('Extra closing bracket ] at position', i);
      console.log('Context:', content.substring(i-50, i+50));
      break;
    }
  }
}

console.log('Final open braces:', openBraces);
console.log('Final open brackets:', openBrackets);

if (openBraces !== 0 || openBrackets !== 0) {
  console.log('\n⚠️ Structure is unbalanced!');
}
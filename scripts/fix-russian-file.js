/**
 * Fix the russian-data.js file specifically
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'js', 'russian-data.js');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Fixing russian-data.js...');

// First, remove the misplaced apps: []
content = content.replace(/\s*apps:\s*\[\]\s*/g, '');

// Now add apps at the correct location - at the end of the resources object
// Find the last closing bracket before the final };
const lines = content.split('\n');
let targetLineIndex = -1;

// Find the pattern: ]
//                    }
//                ]
//            }
//        ]
//    }
// };

for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '};') {
        // Found the end, now go back to find where to insert apps
        for (let j = i - 1; j >= 0; j--) {
            if (lines[j].trim() === '}') {
                // This is the closing of the main russianResources object
                // Insert apps before this line
                targetLineIndex = j;
                break;
            }
        }
        break;
    }
}

if (targetLineIndex > 0) {
    // Insert apps array at the right place
    lines[targetLineIndex] = '    },\n    apps: []\n}';
    content = lines.join('\n');

    // Save the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed russian-data.js');

    // Verify it can be loaded
    try {
        delete require.cache[require.resolve(filePath)];
        require(filePath);
        console.log('✅ File loads successfully!');
    } catch (e) {
        console.error('❌ File still has errors:', e.message);
    }
} else {
    console.error('❌ Could not find proper insertion point');
}
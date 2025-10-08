#!/usr/bin/env node
// ===================================
// Fix Export Naming Issues in Language Data Files
// ===================================

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const languageDir = join(__dirname, '..', 'assets', 'js');
const languageFiles = readdirSync(languageDir)
  .filter(f => f.endsWith('-data.js'))
  .sort();

let filesFixed = 0;
let errors = 0;

console.log(`🔧 Fixing exports in ${languageFiles.length} language data files...\n`);

for (const file of languageFiles) {
  const filePath = join(languageDir, file);
  const code = basename(file, '-data.js');

  try {
    let content = readFileSync(filePath, 'utf-8');

    // Find the variable name from the const declaration
    // Pattern: const xxxData = { or const xxxResources = {
    const constMatch = content.match(/const\s+(\w+(?:Data|Resources))\s*=/);

    if (!constMatch) {
      console.warn(`⚠️  ${file}: Could not find variable declaration`);
      errors++;
      continue;
    }

    const varName = constMatch[1];

    // Check if exports already exist and are correct
    const hasNamedExport = content.includes(`export { ${varName} }`);
    const hasDefaultExport = content.includes(`export default ${varName}`);

    if (hasNamedExport && hasDefaultExport) {
      console.log(`✅ ${file}: Exports already correct (${varName})`);
      continue;
    }

    // Find and replace incorrect export statements
    let modified = false;

    // Fix named export
    const namedExportPattern = /export\s*\{\s*[^}]+\s*\}/;
    if (namedExportPattern.test(content)) {
      content = content.replace(namedExportPattern, `export { ${varName} }`);
      modified = true;
    } else if (!hasNamedExport) {
      // Add named export if it doesn't exist
      content += `\nexport { ${varName} };\n`;
      modified = true;
    }

    // Fix default export
    const defaultExportPattern = /export\s+default\s+\w+/;
    if (defaultExportPattern.test(content)) {
      content = content.replace(defaultExportPattern, `export default ${varName}`);
      modified = true;
    } else if (!hasDefaultExport) {
      // Add default export if it doesn't exist
      content += `export default ${varName};\n`;
      modified = true;
    }

    if (modified) {
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ ${file}: Fixed exports → ${varName}`);
      filesFixed++;
    }
  } catch (error) {
    console.error(`❌ ${file}: Error - ${error.message}`);
    errors++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Fixed: ${filesFixed} files`);
console.log(`   Errors: ${errors} files`);
console.log(`   Total: ${languageFiles.length} files\n`);

process.exit(errors > 0 ? 1 : 0);

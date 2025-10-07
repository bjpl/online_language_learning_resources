#!/usr/bin/env node

/**
 * Convert language data files to ES6 modules
 * Adds export statements to make files compatible with dynamic imports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsJsDir = path.join(__dirname, '..', 'assets', 'js');

// Map of file names to their resource variable names
const languageFiles = [
  { file: 'afrikaans-data.js', varName: 'afrikaans Resources' },
  { file: 'arabic-data.js', varName: 'arabicResources' },
  { file: 'bengali-data.js', varName: 'bengaliResources' },
  { file: 'bulgarian-data.js', varName: 'bulgarianResources' },
  { file: 'burmese-data.js', varName: 'burmeseResources' },
  { file: 'cebuano-data.js', varName: 'cebuanoResources' },
  { file: 'chinese-data.js', varName: 'chineseResources' },
  { file: 'cree-data.js', varName: 'creeResources' },
  { file: 'croatian-data.js', varName: 'croatianResources' },
  { file: 'czech-data.js', varName: 'czechResources' },
  { file: 'danish-data.js', varName: 'danishResources' },
  { file: 'dari-data.js', varName: 'dariResources' },
  { file: 'dutch-data.js', varName: 'dutchResources' },
  { file: 'estonian-data.js', varName: 'estonianResources' },
  { file: 'finnish-data.js', varName: 'finnishResources' },
  { file: 'flemish-data.js', varName: 'flemishResources' },
  { file: 'french-data.js', varName: 'frenchResources' },
  { file: 'german-data.js', varName: 'germanResources' },
  { file: 'greek-data.js', varName: 'greekResources' },
  { file: 'guarani-data.js', varName: 'guaraniResources' },
  { file: 'gujarati-data.js', varName: 'gujaratiResources' },
  { file: 'hausa-data.js', varName: 'hausaResources' },
  { file: 'hebrew-data.js', varName: 'hebrewResources' },
  { file: 'hindi-data.js', varName: 'hindiResources' },
  { file: 'hmong-data.js', varName: 'hmongResources' },
  { file: 'hungarian-data.js', varName: 'hungarianResources' },
  { file: 'indonesian-data.js', varName: 'indonesianResources' },
  { file: 'inuktitut-data.js', varName: 'inuktitutResources' },
  { file: 'irish-data.js', varName: 'irishResources' },
  { file: 'italian-data.js', varName: 'italianResources' },
  { file: 'japanese-data.js', varName: 'japaneseResources' },
  { file: 'kannada-data.js', varName: 'kannadaResources' },
  { file: 'kazakh-data.js', varName: 'kazakhResources' },
  { file: 'korean-data.js', varName: 'koreanResources' },
  { file: 'lao-data.js', varName: 'laoResources' },
  { file: 'latvian-data.js', varName: 'latvianResources' },
  { file: 'lithuanian-data.js', varName: 'lithuanianResources' },
  { file: 'malay-data.js', varName: 'malayResources' },
  { file: 'marathi-data.js', varName: 'marathiResources' },
  { file: 'mongolian-data.js', varName: 'mongolianResources' },
  { file: 'nahuatl-data.js', varName: 'nahuatlResources' },
  { file: 'navajo-data.js', varName: 'navajoResources' },
  { file: 'nepali-data.js', varName: 'nepaliResources' },
  { file: 'pashto-data.js', varName: 'pashtoResources' },
  { file: 'persian-data.js', varName: 'persianResources' },
  { file: 'polish-data.js', varName: 'polishResources' },
  { file: 'portuguese-data.js', varName: 'portugueseResources' },
  { file: 'punjabi-data.js', varName: 'punjabiResources' },
  { file: 'quechua-data.js', varName: 'quechuaResources' },
  { file: 'romanian-data.js', varName: 'romanianResources' },
  { file: 'russian-data.js', varName: 'russianResources' },
  { file: 'serbian-data.js', varName: 'serbianResources' },
  { file: 'sign-language-data.js', varName: 'signLanguageResources' },
  { file: 'slovak-data.js', varName: 'slovakResources' },
  { file: 'spanish-data.js', varName: 'spanishResources' },
  { file: 'swahili-data.js', varName: 'swahiliResources' },
  { file: 'swedish-data.js', varName: 'swedishResources' },
  { file: 'tagalog-data.js', varName: 'tagalogResources' },
  { file: 'tamil-data.js', varName: 'tamilResources' },
  { file: 'telugu-data.js', varName: 'teluguResources' },
  { file: 'thai-data.js', varName: 'thaiResources' },
  { file: 'ukrainian-data.js', varName: 'ukrainianResources' },
  { file: 'urdu-data.js', varName: 'urduResources' },
  { file: 'vietnamese-data.js', varName: 'vietnameseResources' },
  { file: 'welsh-data.js', varName: 'welshResources' },
  { file: 'wolof-data.js', varName: 'wolofResources' },
  { file: 'yoruba-data.js', varName: 'yorubaResources' },
];

let successCount = 0;
let errorCount = 0;

console.log(`\nConverting ${languageFiles.length} language data files to ES6 modules...\n`);

for (const { file, varName } of languageFiles) {
  const filePath = path.join(assetsJsDir, file);

  try {
    // Read file
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if already has export
    if (content.includes(`export { ${varName}`) || content.includes(`export default ${varName}`)) {
      console.log(`✓ ${file} - Already converted`);
      successCount++;
      continue;
    }

    // Add export statement at the end
    const exportStatement = `\n// ES6 Module Export\nexport { ${varName} };\nexport default ${varName};\n`;

    // Append export
    content += exportStatement;

    // Write back
    fs.writeFileSync(filePath, content, 'utf8');

    console.log(`✓ ${file} - Converted successfully`);
    successCount++;
  } catch (error) {
    console.error(`✗ ${file} - Error: ${error.message}`);
    errorCount++;
  }
}

console.log(`\n========================================`);
console.log(`Conversion complete!`);
console.log(`Success: ${successCount}`);
console.log(`Errors: ${errorCount}`);
console.log(`========================================\n`);

process.exit(errorCount > 0 ? 1 : 0);

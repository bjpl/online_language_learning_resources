#!/usr/bin/env node
// ===================================
// Extract Language Metadata from Data Files
// ===================================

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const languageDir = join(__dirname, '..', 'assets', 'js');
const languageFiles = readdirSync(languageDir)
  .filter(f => f.endsWith('-data.js'))
  .sort();

const metadata = [];

for (const file of languageFiles) {
  const code = basename(file, '-data.js');
  const content = readFileSync(join(languageDir, file), 'utf-8');

  // Extract metadata using regex
  const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
  const nativeNameMatch = content.match(/nativeName:\s*["']([^"']+)["']/);
  const flagMatch = content.match(/flag:\s*["']([^"']+)["']/);
  const speakersMatch = content.match(/speakers:\s*["']([^"']+)["']/);
  const learnersMatch = content.match(/learners:\s*["']([^"']+)["']/);

  metadata.push({
    code,
    name: nameMatch ? nameMatch[1] : code.charAt(0).toUpperCase() + code.slice(1),
    nativeName: nativeNameMatch ? nativeNameMatch[1] : '',
    flag: flagMatch ? flagMatch[1] : '🌐',
    speakers: speakersMatch ? speakersMatch[1] : '',
    learners: learnersMatch ? learnersMatch[1] : '',
  });
}

// Output as JSON for use in generating the metadata file
console.log(JSON.stringify(metadata, null, 2));

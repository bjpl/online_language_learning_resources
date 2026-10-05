// Load every language data file in Node, using the same language map and
// flattening rules as the browser review tool.
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { LanguageLoader } from '../../../assets/js/language-loader.js';
import { flattenLanguage, assignIds } from '../../../tools/review/lib/resources.js';

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, '../../..');
export const DATA_DIR = path.join(ROOT, 'assets/js/language-data');
export const RESULTS_DIR = path.join(ROOT, 'review_results');

export const languageMap = new LanguageLoader().languageMap;

export function dataFileFor(langKey) {
  const file = languageMap[langKey];
  return file ? path.join(DATA_DIR, `${file}.js`) : null;
}

/** Import a data file fresh (bypassing the module cache) and return its default export. */
export async function importLanguageFile(file) {
  const url = `${pathToFileURL(file).href}?t=${Date.now()}${Math.random()}`;
  const mod = await import(url);
  return mod.default;
}

export async function loadAllResources() {
  const resources = [];
  for (const langKey of Object.keys(languageMap)) {
    const lang = await importLanguageFile(dataFileFor(langKey));
    resources.push(...flattenLanguage(langKey, lang));
  }
  return assignIds(resources);
}

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { parseCharactersSheet } from '../src/utils/parseCharactersSheet.js';

const CHARACTERS_SPREADSHEET_ID = '1dusDT6o-wpPtRTrEfELY09SwdUxSvls-3AIqQGkQMTM';
const CHARACTERS_SHEET_GID = '0';

const getSheetCsvUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/data');
mkdirSync(outDir, { recursive: true });

const response = await fetch(getSheetCsvUrl(CHARACTERS_SPREADSHEET_ID, CHARACTERS_SHEET_GID));

if (!response.ok) {
  throw new Error(`Failed to fetch characters sheet (${response.status})`);
}

const characters = parseCharactersSheet(await response.text());
const data = {
  updatedAt: new Date().toISOString(),
  spreadsheetId: CHARACTERS_SPREADSHEET_ID,
  characters,
};

writeFileSync(join(outDir, 'characters.json'), JSON.stringify(data, null, 2), 'utf8');
console.log(`characters.json: ${characters.length} characters`);

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { parseShopSheet } from '../src/utils/parseShopSheet.js';

const SHOP_SPREADSHEET_ID = '1Y-yHRPy0dLHoZnSrzgzcoj_xb5BcFHdFaH9WiHbSU1A';
const SHOP_SHEET_GID = '0';

const getSheetCsvUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/data');
mkdirSync(outDir, { recursive: true });

const response = await fetch(getSheetCsvUrl(SHOP_SPREADSHEET_ID, SHOP_SHEET_GID));

if (!response.ok) {
  throw new Error(`Failed to fetch shop sheet (${response.status})`);
}

const items = parseShopSheet(await response.text());
const data = {
  updatedAt: new Date().toISOString(),
  spreadsheetId: SHOP_SPREADSHEET_ID,
  items,
};

writeFileSync(join(outDir, 'shop.json'), JSON.stringify(data, null, 2), 'utf8');
console.log(`shop.json: ${items.length} products`);

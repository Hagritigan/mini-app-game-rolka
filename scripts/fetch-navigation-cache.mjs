import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  applyNavigationSheetColors,
  parseNavigationSheet,
} from '../src/utils/parseNavigationSheet.js';

const NAVIGATION_SPREADSHEET_ID = '1e-y_ddIUAJoJ_ep4qfA4GuBd8hWksIocqWSdjEsUK1o';
const NAVIGATION_SHEET_GID = '0';

const getSheetCsvUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;

const getSheetXlsxUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx&gid=${gid}`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/data');
mkdirSync(outDir, { recursive: true });

const [csvResponse, xlsxResponse] = await Promise.all([
  fetch(getSheetCsvUrl(NAVIGATION_SPREADSHEET_ID, NAVIGATION_SHEET_GID)),
  fetch(getSheetXlsxUrl(NAVIGATION_SPREADSHEET_ID, NAVIGATION_SHEET_GID)),
]);

if (!csvResponse.ok) {
  throw new Error(`Failed to fetch navigation sheet (${csvResponse.status})`);
}

const { items, byLink, influenceColumns: csvInfluenceColumns } = parseNavigationSheet(await csvResponse.text());
let colors = null;
let influenceColumns = csvInfluenceColumns;

if (xlsxResponse.ok) {
  colors = applyNavigationSheetColors(items, await xlsxResponse.arrayBuffer(), csvInfluenceColumns);
  influenceColumns = colors.influenceColumns;
}

const data = {
  updatedAt: new Date().toISOString(),
  spreadsheetId: NAVIGATION_SPREADSHEET_ID,
  influenceColumns,
  items,
  byLink,
  colors,
};

writeFileSync(join(outDir, 'navigation.json'), JSON.stringify(data, null, 2), 'utf8');
console.log(`navigation.json: ${items.length} islands, ${influenceColumns.length} influence columns`);

if (colors) {
  console.log(`palette: ${JSON.stringify(colors.palette)}`);
}

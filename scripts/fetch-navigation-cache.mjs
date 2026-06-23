import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const NAVIGATION_SPREADSHEET_ID = '1e-y_ddIUAJoJ_ep4qfA4GuBd8hWksIocqWSdjEsUK1o';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') { field += '"'; i += 1; }
      else if (char === '"') inQuotes = false;
      else field += char;
      continue;
    }
    if (char === '"') inQuotes = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\r' && next === '\n') { row.push(field); rows.push(row); row = []; field = ''; i += 1; }
    else if (char === '\n' || char === '\r') { row.push(field); rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function normalizeTopicLink(link) {
  return String(link || '').trim().toLowerCase().replace(/\/$/, '');
}

function normalizeCell(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function parseNavigationSheet(csvText) {
  const rows = parseCsv(csvText).slice(1);
  const items = [];
  const byLink = {};

  rows.forEach((row, index) => {
    const title = normalizeCell(row[0]);
    const link = normalizeCell(row[1]);
    const dozor = normalizeCell(row[2]);
    const pp = normalizeCell(row[3]);

    if (!link) return;

    const item = {
      id: `navigation-${index}-${normalizeTopicLink(link)}`,
      title,
      link,
      dozor,
      pp,
      hasDozor: Boolean(dozor),
      hasPp: Boolean(pp),
    };

    items.push(item);
    byLink[normalizeTopicLink(link)] = item;
  });

  return { items, byLink };
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/data');
mkdirSync(outDir, { recursive: true });

const response = await fetch(
  `https://docs.google.com/spreadsheets/d/${NAVIGATION_SPREADSHEET_ID}/gviz/tq?tqx=out:csv&gid=0`,
);

if (!response.ok) {
  throw new Error(`Failed to fetch navigation sheet (${response.status})`);
}

const { items, byLink } = parseNavigationSheet(await response.text());
const data = {
  updatedAt: new Date().toISOString(),
  spreadsheetId: NAVIGATION_SPREADSHEET_ID,
  items,
  byLink,
};

writeFileSync(join(outDir, 'navigation.json'), JSON.stringify(data, null, 2), 'utf8');
console.log(`navigation.json: ${items.length} islands`);

import { mainLocations } from '../src/navigation/data/mainLocations.js';

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

function normalizeLink(link) {
  return String(link || '').trim().toLowerCase().replace(/\/$/, '');
}

const sheetRes = await fetch(
  `https://docs.google.com/spreadsheets/d/${NAVIGATION_SPREADSHEET_ID}/gviz/tq?tqx=out:csv&gid=0`,
);
const sheetRows = parseCsv(await sheetRes.text()).slice(1);
const sheetByLink = new Map();
sheetRows.forEach((row) => {
  const link = normalizeLink(row[1]);
  if (link) sheetByLink.set(link, row);
});

const navLinks = [];
mainLocations.forEach((loc) => {
  loc.ways?.forEach((way) => {
    way.islands.forEach((island) => {
      if (island.link) navLinks.push({ title: island.title, link: island.link });
      island.childrens?.forEach((child) => {
        if (child.link) navLinks.push({ title: child.title, link: child.link, parent: island.title });
      });
    });
  });
});

let matched = 0;
const unmatchedNav = [];
const unmatchedSheet = new Set(sheetByLink.keys());

navLinks.forEach((item) => {
  const key = normalizeLink(item.link);
  if (sheetByLink.has(key)) {
    matched += 1;
    unmatchedSheet.delete(key);
  } else {
    unmatchedNav.push(item);
  }
});

console.log('Nav links:', navLinks.length);
console.log('Sheet rows:', sheetByLink.size);
console.log('Matched:', matched);
console.log('\nUnmatched nav:', unmatchedNav.slice(0, 15).map((i) => `${i.title} | ${i.link}`));
console.log('\nUnmatched sheet:', [...unmatchedSheet].slice(0, 15));

import { unzipSync } from 'fflate';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ACHIEVEMENTS_SPREADSHEET_ID = '18r-SzbIGcPqMzdwqcLgOQIFD5P1C2ZSxomres_3iWw4';
const INVENTORY_SPREADSHEET_ID = '15vRg4u3qDxKxkS_polQbCME7F2gFX8LnHhKMzNXQVpI';

const SHEET_META_REGEX =
  /\[(\d+),0,\\"(\d+)\\",\[\{\\"1\\":\[\[0,0,\\"([^"\\]+)\\"\]/g;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/data');

const getSpreadsheetEditUrl = (spreadsheetId) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?hl=ru`;

const getSpreadsheetXlsxUrl = (spreadsheetId) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx`;

const getSheetCsvUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;

const getSheetXlsxUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx&gid=${gid}`;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\r' && next === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i += 1;
    } else if (char === '\n' || char === '\r') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function parseSheetChildGids(cellValue) {
  const trimmed = cellValue.trim();
  const match = trimmed.match(/^\[\s*([\d\s,]+)\s*\]$/);

  if (!match) {
    return null;
  }

  const gids = match[1]
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  return gids.length > 0 ? gids : null;
}

function parseSheetChildGidsFromCsv(csvText) {
  const rows = parseCsv(csvText);
  const firstCell = (rows[0]?.[0] || '').trim();
  return parseSheetChildGids(firstCell);
}

function parseSheetGidsFromHtml(html) {
  const gids = [];
  const seen = new Set();
  const regex = /gid[=:]([0-9]+)/g;
  let match;

  while ((match = regex.exec(html))) {
    const gid = match[1];

    if (!seen.has(gid)) {
      seen.add(gid);
      gids.push(gid);
    }
  }

  return gids;
}

function parseSpreadsheetImageUrl(value) {
  const trimmed = String(value || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!trimmed) {
    return '';
  }

  const urlMatch = trimmed.match(/https?:\/\/[^\s")\]]+/i);
  return urlMatch ? urlMatch[0] : '';
}

function parseSpreadsheetOwnerField(value) {
  const trimmed = String(value || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!trimmed) {
    return { ownerName: '', ownerUrl: '' };
  }

  const hyperlinkMatch = trimmed.match(
    /^=HYPERLINK\s*\(\s*"([^"]+)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\)$/i,
  );

  if (hyperlinkMatch) {
    return {
      ownerUrl: hyperlinkMatch[1],
      ownerName: hyperlinkMatch[2].replace(/""/g, '"').trim(),
    };
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return {
      ownerUrl: parseSpreadsheetImageUrl(trimmed),
      ownerName: '',
    };
  }

  return { ownerName: trimmed, ownerUrl: '' };
}

function parseAchievementsFromCsv(csvText, sheetId = 'default') {
  const rows = parseCsv(csvText);
  const achievements = [];

  rows.forEach((row, index) => {
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();
    const icon = normalize(row[0] || '');
    const title = normalize(row[1] || '');
    const description = normalize(row[2] || '');
    const note = normalize(row[3] || '');
    const points = normalize(row[4] || '');

    if (!title && !description) {
      return;
    }

    achievements.push({
      id: `${sheetId}-${index}-${title.slice(0, 24)}`,
      icon,
      title,
      description,
      note,
      points,
    });
  });

  return achievements;
}

function decodeXmlEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

function parseRelationshipTargets(relsXml) {
  const rels = new Map();
  const regex = /Id="([^"]+)"[^>]*Target="([^"]+)"/g;
  let match;

  while ((match = regex.exec(relsXml))) {
    rels.set(match[1], decodeXmlEntities(match[2]));
  }

  return rels;
}

function parseSheetHyperlinks(sheetXml, rels) {
  const links = new Map();
  const tagRegex = /<hyperlink\s+([^/>]+)\/?>/g;
  let match;

  while ((match = tagRegex.exec(sheetXml))) {
    const attrs = match[1];
    const refMatch = attrs.match(/ref="([A-Z]+)(\d+)"/);
    const idMatch = attrs.match(/r:id="([^"]+)"/);

    if (!refMatch || !idMatch) {
      continue;
    }

    const url = rels.get(idMatch[1]);
    if (url) {
      links.set(`${refMatch[1]}${refMatch[2]}`, url);
    }
  }

  return links;
}

function parseXlsxColumnHyperlinks(arrayBuffer, column = 'D') {
  const files = unzipSync(new Uint8Array(arrayBuffer));
  const sheetXml = new TextDecoder().decode(files['xl/worksheets/sheet1.xml']);
  const relsXml = new TextDecoder().decode(files['xl/worksheets/_rels/sheet1.xml.rels']);
  const rels = parseRelationshipTargets(relsXml);
  const allLinks = parseSheetHyperlinks(sheetXml, rels);
  const columnLinks = new Map();

  allLinks.forEach((url, cellRef) => {
    if (!cellRef.startsWith(column)) {
      return;
    }

    const row = Number(cellRef.slice(column.length));
    if (row > 0) {
      columnLinks.set(row, url);
    }
  });

  return columnLinks;
}

function parseXlsxSheetNames(arrayBuffer) {
  const files = unzipSync(new Uint8Array(arrayBuffer));
  const workbookXml = new TextDecoder().decode(files['xl/workbook.xml']);
  const names = [];
  const regex = /<sheet[^>]*\bname="([^"]+)"/g;
  let match;

  while ((match = regex.exec(workbookXml))) {
    names.push(match[1]);
  }

  return names;
}

function parseInventoryFromCsv(csvText, sheetId = 'default', ownerUrlsByRow = null) {
  const rows = parseCsv(csvText);
  const items = [];

  rows.forEach((row, index) => {
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();
    const title = normalize(row[0] || '');
    const description = normalize(row[1] || '');
    const equipmentImage = parseSpreadsheetImageUrl(row[2] || '');
    const { ownerName, ownerUrl: ownerUrlFromCell } = parseSpreadsheetOwnerField(row[3] || '');
    const ownerUrl = ownerUrlsByRow?.get(index + 1) || ownerUrlFromCell;

    if (!title && !description && !equipmentImage && !ownerName) {
      return;
    }

    items.push({
      id: `${sheetId}-${index}-${title.slice(0, 24) || index}`,
      title,
      description,
      equipmentImage,
      ownerName,
      ownerUrl,
    });
  });

  return items;
}

function parseSheetsFromHtmlMeta(html) {
  const sheets = [];
  let match = SHEET_META_REGEX.exec(html);

  while (match) {
    sheets.push({
      index: Number(match[1]),
      gid: match[2],
      title: match[3],
    });
    match = SHEET_META_REGEX.exec(html);
  }

  return sheets;
}

function parseSheetsFromTabCaptions(html) {
  const captions = [...html.matchAll(/docs-sheet-tab-caption">([^<]+)</g)].map((m) => m[1].trim());

  if (captions.length === 0) {
    return [];
  }

  return captions.map((title, index) => ({
    index,
    gid: String(index),
    title,
  }));
}

async function fetchSheetsFromXlsxFallback(spreadsheetId, html) {
  const gids = parseSheetGidsFromHtml(html);

  if (gids.length === 0) {
    return [];
  }

  const response = await fetch(getSpreadsheetXlsxUrl(spreadsheetId));

  if (!response.ok) {
    return [];
  }

  const titles = parseXlsxSheetNames(await response.arrayBuffer());

  if (titles.length === 0) {
    return [];
  }

  const sheetCount = Math.min(gids.length, titles.length);

  return Array.from({ length: sheetCount }, (_, index) => ({
    index,
    gid: gids[index],
    title: titles[index],
  }));
}

async function fetchAllSheetsFromHtml(spreadsheetId) {
  const response = await fetch(getSpreadsheetEditUrl(spreadsheetId));

  if (!response.ok) {
    throw new Error(`Не удалось получить список листов (${response.status})`);
  }

  const html = await response.text();
  const sheetsFromMeta = parseSheetsFromHtmlMeta(html);

  if (sheetsFromMeta.length > 0) {
    return sheetsFromMeta;
  }

  const sheetsFromCaptions = parseSheetsFromTabCaptions(html);

  if (sheetsFromCaptions.length > 0) {
    return sheetsFromCaptions;
  }

  const sheetsFromXlsx = await fetchSheetsFromXlsxFallback(spreadsheetId, html);

  if (sheetsFromXlsx.length > 0) {
    return sheetsFromXlsx;
  }

  throw new Error('Не удалось распознать листы в таблице');
}

async function fetchSheetCsv(spreadsheetId, gid) {
  const response = await fetch(getSheetCsvUrl(spreadsheetId, gid));

  if (!response.ok) {
    throw new Error(`Не удалось загрузить лист (${response.status})`);
  }

  return response.text();
}

async function fetchSpreadsheetStructure(spreadsheetId) {
  const allSheets = await fetchAllSheetsFromHtml(spreadsheetId);
  const nestedGids = new Set();
  const groupMeta = {};

  await Promise.all(
    allSheets.map(async (sheet) => {
      try {
        const csv = await fetchSheetCsv(spreadsheetId, sheet.gid);
        const childGids = parseSheetChildGidsFromCsv(csv);

        if (childGids) {
          groupMeta[sheet.gid] = childGids;
          childGids.forEach((gid) => nestedGids.add(String(gid)));
        }
      } catch {
        // лист без маркера или ошибка — пропускаем
      }
    }),
  );

  const enrichedSheets = allSheets.map((sheet) => ({
    ...sheet,
    ...(groupMeta[sheet.gid] ? { childGids: groupMeta[sheet.gid] } : {}),
  }));

  const sheetsByGid = Object.fromEntries(enrichedSheets.map((sheet) => [sheet.gid, sheet]));
  const rootSheets = enrichedSheets.filter((sheet) => !nestedGids.has(sheet.gid));

  return { allSheets: enrichedSheets, rootSheets, sheetsByGid };
}

async function fetchAchievementsByGid(gid, spreadsheetId) {
  const csv = await fetchSheetCsv(spreadsheetId, gid);
  return parseAchievementsFromCsv(csv, gid);
}

async function fetchInventoryByGid(gid, spreadsheetId) {
  const [csv, xlsxResponse] = await Promise.all([
    fetchSheetCsv(spreadsheetId, gid),
    fetch(getSheetXlsxUrl(spreadsheetId, gid)),
  ]);

  let ownerUrlsByRow = null;

  if (xlsxResponse.ok) {
    try {
      ownerUrlsByRow = parseXlsxColumnHyperlinks(await xlsxResponse.arrayBuffer(), 'D');
    } catch {
      ownerUrlsByRow = null;
    }
  }

  return parseInventoryFromCsv(csv, gid, ownerUrlsByRow);
}

function isGroupSheet(sheet) {
  return Boolean(sheet?.childGids?.length);
}

async function buildCache(spreadsheetId, fetchSheetData, sheetKey) {
  const structure = await fetchSpreadsheetStructure(spreadsheetId);
  const sheets = {};

  await Promise.all(
    structure.allSheets.map(async (sheet) => {
      if (isGroupSheet(sheet)) {
        return;
      }

      try {
        sheets[sheet.gid] = {
          [sheetKey]: await fetchSheetData(sheet.gid, spreadsheetId),
        };
      } catch {
        sheets[sheet.gid] = { [sheetKey]: [] };
      }
    }),
  );

  return {
    updatedAt: new Date().toISOString(),
    spreadsheetId,
    structure,
    sheets,
  };
}

mkdirSync(outDir, { recursive: true });

console.log('Загрузка достижений…');
const achievements = await buildCache(
  ACHIEVEMENTS_SPREADSHEET_ID,
  fetchAchievementsByGid,
  'achievements',
);
writeFileSync(join(outDir, 'achievements.json'), JSON.stringify(achievements, null, 2), 'utf8');
console.log(
  `  листов: ${achievements.structure.allSheets.length}, данных: ${Object.keys(achievements.sheets).length}`,
);

console.log('Загрузка инвентаря…');
const inventory = await buildCache(INVENTORY_SPREADSHEET_ID, fetchInventoryByGid, 'items');
writeFileSync(join(outDir, 'inventory.json'), JSON.stringify(inventory, null, 2), 'utf8');
console.log(
  `  листов: ${inventory.structure.allSheets.length}, данных: ${Object.keys(inventory.sheets).length}`,
);

console.log(`\nГотово: ${outDir}`);

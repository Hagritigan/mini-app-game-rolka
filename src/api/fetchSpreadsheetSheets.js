import {
  ACHIEVEMENTS_SPREADSHEET_ID,
  getSheetCsvUrl,
  getSpreadsheetEditUrl,
  getSpreadsheetXlsxUrl,
} from '../config/googleSheets';
import { parseSheetChildGidsFromCsv } from '../utils/parseSheetChildGids';
import { parseSheetGidsFromHtml } from '../utils/parseSheetGidsFromHtml';
import { parseXlsxSheetNames } from '../utils/parseXlsxWorkbookSheets';

const SHEET_META_REGEX =
  /\[(\d+),0,\\"(\d+)\\",\[\{\\"1\\":\[\[0,0,\\"([^"\\]+)\\"\]/g;

const structureCacheBySpreadsheetId = new Map();

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

/**
 * @returns {{ allSheets: Array, rootSheets: Array, sheetsByGid: Record<string, object> }}
 */
export async function fetchSpreadsheetStructure({
  spreadsheetId = ACHIEVEMENTS_SPREADSHEET_ID,
  force = false,
} = {}) {
  if (!force && structureCacheBySpreadsheetId.has(spreadsheetId)) {
    return structureCacheBySpreadsheetId.get(spreadsheetId);
  }

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

  const structure = { allSheets: enrichedSheets, rootSheets, sheetsByGid };
  structureCacheBySpreadsheetId.set(spreadsheetId, structure);
  return structure;
}

/** @deprecated используйте fetchSpreadsheetStructure */
export async function fetchSpreadsheetSheets(options) {
  const { rootSheets } = await fetchSpreadsheetStructure(options);
  return rootSheets;
}

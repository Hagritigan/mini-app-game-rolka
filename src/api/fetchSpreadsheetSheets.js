import { getAchievementsSheetCsvUrl, getSpreadsheetEditUrl } from '../config/googleSheets';
import { parseSheetChildGidsFromCsv } from '../utils/parseSheetChildGids';

const SHEET_META_REGEX =
  /\[(\d+),0,\\"(\d+)\\",\[\{\\"1\\":\[\[0,0,\\"([^"\\]+)\\"\]/g;

let structureCache = null;

async function fetchAllSheetsFromHtml() {
  const response = await fetch(getSpreadsheetEditUrl());

  if (!response.ok) {
    throw new Error(`Не удалось получить список листов (${response.status})`);
  }

  const html = await response.text();
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

  if (sheets.length === 0) {
    const captions = [...html.matchAll(/docs-sheet-tab-caption">([^<]+)</g)].map((m) =>
      m[1].trim(),
    );

    if (captions.length > 0) {
      return captions.map((title, index) => ({
        index,
        gid: String(index),
        title,
      }));
    }

    throw new Error('Не удалось распознать листы в таблице');
  }

  return sheets;
}

async function fetchSheetCsv(gid) {
  const response = await fetch(getAchievementsSheetCsvUrl(gid));

  if (!response.ok) {
    throw new Error(`Не удалось загрузить лист (${response.status})`);
  }

  return response.text();
}

/**
 * @returns {{ allSheets: Array, rootSheets: Array, sheetsByGid: Record<string, object> }}
 */
export async function fetchSpreadsheetStructure({ force = false } = {}) {
  if (!force && structureCache) {
    return structureCache;
  }

  const allSheets = await fetchAllSheetsFromHtml();
  const nestedGids = new Set();
  const groupMeta = {};

  await Promise.all(
    allSheets.map(async (sheet) => {
      try {
        const csv = await fetchSheetCsv(sheet.gid);
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

  structureCache = { allSheets: enrichedSheets, rootSheets, sheetsByGid };
  return structureCache;
}

/** @deprecated используйте fetchSpreadsheetStructure */
export async function fetchSpreadsheetSheets(options) {
  const { rootSheets } = await fetchSpreadsheetStructure(options);
  return rootSheets;
}

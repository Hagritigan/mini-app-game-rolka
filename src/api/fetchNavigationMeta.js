import {
  NAVIGATION_SHEET_GID,
  NAVIGATION_SPREADSHEET_ID,
  getSheetCsvUrl,
  getSheetXlsxUrl,
} from '../config/googleSheets';
import { applyNavigationSheetColors, parseNavigationSheet } from '../utils/parseNavigationSheet';

export async function fetchNavigationMeta() {
  const [csvResponse, xlsxResponse] = await Promise.all([
    fetch(getSheetCsvUrl(NAVIGATION_SPREADSHEET_ID, NAVIGATION_SHEET_GID)),
    fetch(getSheetXlsxUrl(NAVIGATION_SPREADSHEET_ID, NAVIGATION_SHEET_GID)),
  ]);

  if (!csvResponse.ok) {
    throw new Error(`Не удалось загрузить навигацию (${csvResponse.status})`);
  }

  const csv = await csvResponse.text();
  const { items, byLink, influenceColumns: csvInfluenceColumns } = parseNavigationSheet(csv);
  let colors = null;
  let influenceColumns = csvInfluenceColumns;

  if (xlsxResponse.ok) {
    colors = applyNavigationSheetColors(items, await xlsxResponse.arrayBuffer(), csvInfluenceColumns);
    influenceColumns = colors.influenceColumns;
  }

  return {
    updatedAt: new Date().toISOString(),
    spreadsheetId: NAVIGATION_SPREADSHEET_ID,
    items,
    byLink,
    influenceColumns,
    colors,
  };
}

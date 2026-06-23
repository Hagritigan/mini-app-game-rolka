import {
  NAVIGATION_SHEET_GID,
  NAVIGATION_SPREADSHEET_ID,
  getSheetCsvUrl,
} from '../config/googleSheets';
import { parseNavigationSheet } from '../utils/parseNavigationSheet';

export async function fetchNavigationMeta() {
  const response = await fetch(getSheetCsvUrl(NAVIGATION_SPREADSHEET_ID, NAVIGATION_SHEET_GID));

  if (!response.ok) {
    throw new Error(`Не удалось загрузить навигацию (${response.status})`);
  }

  const csv = await response.text();
  const { items, byLink } = parseNavigationSheet(csv);

  return {
    updatedAt: new Date().toISOString(),
    spreadsheetId: NAVIGATION_SPREADSHEET_ID,
    items,
    byLink,
  };
}

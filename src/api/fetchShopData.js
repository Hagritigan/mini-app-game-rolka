import {
  SHOP_SHEET_GID,
  SHOP_SPREADSHEET_ID,
  getSheetCsvUrl,
} from '../config/googleSheets';
import { parseShopSheet } from '../utils/parseShopSheet';

export async function fetchShopData() {
  const response = await fetch(getSheetCsvUrl(SHOP_SPREADSHEET_ID, SHOP_SHEET_GID));

  if (!response.ok) {
    throw new Error(`Не удалось загрузить магазин (${response.status})`);
  }

  const items = parseShopSheet(await response.text());

  return {
    updatedAt: new Date().toISOString(),
    spreadsheetId: SHOP_SPREADSHEET_ID,
    items,
  };
}

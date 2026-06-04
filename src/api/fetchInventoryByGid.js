import { INVENTORY_SPREADSHEET_ID, getSheetCsvUrl } from '../config/googleSheets';
import { parseInventoryFromCsv } from '../utils/parseInventorySheet';

export async function fetchInventoryByGid(gid, spreadsheetId = INVENTORY_SPREADSHEET_ID) {
  const response = await fetch(getSheetCsvUrl(spreadsheetId, gid));

  if (!response.ok) {
    throw new Error(`Не удалось загрузить лист (${response.status})`);
  }

  const csv = await response.text();
  return parseInventoryFromCsv(csv, gid);
}

import {
  INVENTORY_SPREADSHEET_ID,
  getSheetCsvUrl,
  getSheetXlsxUrl,
} from '../config/googleSheets';
import { parseInventoryFromCsv } from '../utils/parseInventorySheet';
import { parseXlsxColumnHyperlinks } from '../utils/parseXlsxColumnHyperlinks';

export async function fetchInventoryByGid(gid, spreadsheetId = INVENTORY_SPREADSHEET_ID) {
  const [csvResponse, xlsxResponse] = await Promise.all([
    fetch(getSheetCsvUrl(spreadsheetId, gid)),
    fetch(getSheetXlsxUrl(spreadsheetId, gid)),
  ]);

  if (!csvResponse.ok) {
    throw new Error(`Не удалось загрузить лист (${csvResponse.status})`);
  }

  const csv = await csvResponse.text();
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

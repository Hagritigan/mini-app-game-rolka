import { fetchInventoryByGid } from '../fetchInventoryByGid.js';
import { fetchSpreadsheetStructure } from '../fetchSpreadsheetSheets.js';
import { INVENTORY_SPREADSHEET_ID } from '../../config/googleSheets.js';

function isGroupSheet(sheet) {
  return Boolean(sheet?.childGids?.length);
}

export async function fetchFreshInventoryData() {
  const structure = await fetchSpreadsheetStructure({
    spreadsheetId: INVENTORY_SPREADSHEET_ID,
    force: true,
  });
  const sheets = {};

  await Promise.all(
    structure.allSheets.map(async (sheet) => {
      if (isGroupSheet(sheet)) {
        return;
      }

      try {
        sheets[sheet.gid] = {
          items: await fetchInventoryByGid(sheet.gid, INVENTORY_SPREADSHEET_ID),
        };
      } catch {
        sheets[sheet.gid] = { items: [] };
      }
    }),
  );

  return {
    updatedAt: new Date().toISOString(),
    spreadsheetId: INVENTORY_SPREADSHEET_ID,
    structure,
    sheets,
  };
}

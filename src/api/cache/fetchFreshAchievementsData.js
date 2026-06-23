import { fetchAchievementsByGid } from '../fetchAchievementsByGid.js';
import { fetchSpreadsheetStructure } from '../fetchSpreadsheetSheets.js';
import { ACHIEVEMENTS_SPREADSHEET_ID } from '../../config/googleSheets.js';

function isGroupSheet(sheet) {
  return Boolean(sheet?.childGids?.length);
}

export async function fetchFreshAchievementsData() {
  const structure = await fetchSpreadsheetStructure({
    spreadsheetId: ACHIEVEMENTS_SPREADSHEET_ID,
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
          achievements: await fetchAchievementsByGid(sheet.gid, ACHIEVEMENTS_SPREADSHEET_ID),
        };
      } catch {
        sheets[sheet.gid] = { achievements: [] };
      }
    }),
  );

  return {
    updatedAt: new Date().toISOString(),
    spreadsheetId: ACHIEVEMENTS_SPREADSHEET_ID,
    structure,
    sheets,
  };
}

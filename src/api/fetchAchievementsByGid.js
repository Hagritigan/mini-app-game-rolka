import { ACHIEVEMENTS_SPREADSHEET_ID, getSheetCsvUrl } from '../config/googleSheets';
import { parseAchievementsFromCsv } from '../utils/parseAchievementsSheet';

export async function fetchAchievementsByGid(
  gid,
  spreadsheetId = ACHIEVEMENTS_SPREADSHEET_ID,
) {
  const response = await fetch(getSheetCsvUrl(spreadsheetId, gid));

  if (!response.ok) {
    throw new Error(`Не удалось загрузить лист (${response.status})`);
  }

  const csv = await response.text();
  return parseAchievementsFromCsv(csv, gid);
}

import { getAchievementsSheetCsvUrl } from '../config/googleSheets';
import { parseAchievementsFromCsv } from '../utils/parseAchievementsSheet';

export async function fetchAchievementsByGid(gid) {
  const response = await fetch(getAchievementsSheetCsvUrl(gid));

  if (!response.ok) {
    throw new Error(`Не удалось загрузить лист (${response.status})`);
  }

  const csv = await response.text();
  return parseAchievementsFromCsv(csv, gid);
}

import {
  CHARACTERS_SHEET_GID,
  CHARACTERS_SPREADSHEET_ID,
  getSheetCsvUrl,
} from '../config/googleSheets';
import { parseCharactersSheet } from '../utils/parseCharactersSheet';

export async function fetchCharactersData() {
  const response = await fetch(getSheetCsvUrl(CHARACTERS_SPREADSHEET_ID, CHARACTERS_SHEET_GID));

  if (!response.ok) {
    throw new Error(`Не удалось загрузить персонажей (${response.status})`);
  }

  const characters = parseCharactersSheet(await response.text());

  return {
    updatedAt: new Date().toISOString(),
    spreadsheetId: CHARACTERS_SPREADSHEET_ID,
    characters,
  };
}

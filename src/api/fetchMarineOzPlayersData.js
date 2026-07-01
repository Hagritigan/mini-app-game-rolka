import {
  MARINE_OZ_PLAYERS_SHEET_GID,
  MARINE_OZ_PLAYERS_SPREADSHEET_ID,
} from '../config/googleSheets';
import { fetchOzPlayersRankData } from './fetchOzPlayersRankData';

export async function fetchMarineOzPlayersData() {
  return fetchOzPlayersRankData(
    MARINE_OZ_PLAYERS_SPREADSHEET_ID,
    MARINE_OZ_PLAYERS_SHEET_GID,
    'таблицу ОЗ Дозора',
  );
}

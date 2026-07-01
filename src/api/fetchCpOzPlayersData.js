import {
  CP_OZ_PLAYERS_SHEET_GID,
  CP_OZ_PLAYERS_SPREADSHEET_ID,
} from '../config/googleSheets';
import { fetchOzPlayersRankData } from './fetchOzPlayersRankData';

export async function fetchCpOzPlayersData() {
  return fetchOzPlayersRankData(
    CP_OZ_PLAYERS_SPREADSHEET_ID,
    CP_OZ_PLAYERS_SHEET_GID,
    'таблицу ОЗ СП',
  );
}

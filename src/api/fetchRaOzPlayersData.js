import {
  RA_OZ_PLAYERS_SHEET_GID,
  RA_OZ_PLAYERS_SPREADSHEET_ID,
} from '../config/googleSheets';
import { fetchOzPlayersRankData } from './fetchOzPlayersRankData';

export async function fetchRaOzPlayersData() {
  return fetchOzPlayersRankData(
    RA_OZ_PLAYERS_SPREADSHEET_ID,
    RA_OZ_PLAYERS_SHEET_GID,
    'таблицу ОЗ РА',
  );
}

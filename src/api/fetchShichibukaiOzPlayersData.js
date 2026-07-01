import {
  SHICHIBUKAI_OZ_PLAYERS_SHEET_GID,
  SHICHIBUKAI_OZ_PLAYERS_SPREADSHEET_ID,
} from '../config/googleSheets';
import { fetchOzPlayersRankData } from './fetchOzPlayersRankData';

export async function fetchShichibukaiOzPlayersData() {
  return fetchOzPlayersRankData(
    SHICHIBUKAI_OZ_PLAYERS_SPREADSHEET_ID,
    SHICHIBUKAI_OZ_PLAYERS_SHEET_GID,
    'таблицу ОЗ Шичибукаев',
  );
}

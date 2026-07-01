import {
  getSheetCsvUrl,
  getSheetXlsxUrl,
} from '../config/googleSheets';
import { parseOzPlayersRankSheet } from '../utils/parseOzPlayersRankSheet';

export async function fetchOzPlayersRankData(spreadsheetId, sheetGid, label = 'таблицу') {
  const [csvResponse, xlsxResponse] = await Promise.all([
    fetch(getSheetCsvUrl(spreadsheetId, sheetGid)),
    fetch(getSheetXlsxUrl(spreadsheetId, sheetGid)),
  ]);

  if (!csvResponse.ok) {
    throw new Error(`Не удалось загрузить ${label} (${csvResponse.status})`);
  }

  const xlsxArrayBuffer = xlsxResponse.ok ? await xlsxResponse.arrayBuffer() : null;
  const { players, hasRankColumn, scoreColumnLabel } = parseOzPlayersRankSheet(
    await csvResponse.text(),
    xlsxArrayBuffer,
  );

  return {
    updatedAt: new Date().toISOString(),
    spreadsheetId,
    sheetGid,
    hasRankColumn,
    scoreColumnLabel,
    players,
  };
}

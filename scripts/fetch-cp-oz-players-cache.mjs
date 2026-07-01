import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { parseOzPlayersRankSheet } from '../src/utils/parseOzPlayersRankSheet.js';

const CP_OZ_PLAYERS_SPREADSHEET_ID = '1UuVagjGoU5topvRne4xUhaS-yTPaHTY0KAn20Ai6gyg';
const CP_OZ_PLAYERS_SHEET_GID = '883563355';

const getSheetCsvUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;

const getSheetXlsxUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx&gid=${gid}`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/data');
mkdirSync(outDir, { recursive: true });

const [csvResponse, xlsxResponse] = await Promise.all([
  fetch(getSheetCsvUrl(CP_OZ_PLAYERS_SPREADSHEET_ID, CP_OZ_PLAYERS_SHEET_GID)),
  fetch(getSheetXlsxUrl(CP_OZ_PLAYERS_SPREADSHEET_ID, CP_OZ_PLAYERS_SHEET_GID)),
]);

if (!csvResponse.ok) {
  throw new Error(`Failed to fetch CP OZ players sheet (${csvResponse.status})`);
}

const xlsxArrayBuffer = xlsxResponse.ok ? await xlsxResponse.arrayBuffer() : null;
const { players, hasRankColumn, scoreColumnLabel } = parseOzPlayersRankSheet(await csvResponse.text(), xlsxArrayBuffer);
const data = {
  updatedAt: new Date().toISOString(),
  spreadsheetId: CP_OZ_PLAYERS_SPREADSHEET_ID,
  sheetGid: CP_OZ_PLAYERS_SHEET_GID,
  hasRankColumn,
  scoreColumnLabel,
  players,
};

writeFileSync(join(outDir, 'cp-oz-players.json'), JSON.stringify(data, null, 2), 'utf8');
console.log(`cp-oz-players.json: ${players.length} players`);

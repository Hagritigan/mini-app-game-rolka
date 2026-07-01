import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { parseOzPlayersRankSheet } from '../src/utils/parseOzPlayersRankSheet.js';

const MARINE_OZ_PLAYERS_SPREADSHEET_ID = '1UuVagjGoU5topvRne4xUhaS-yTPaHTY0KAn20Ai6gyg';
const MARINE_OZ_PLAYERS_SHEET_GID = '528054903';

const getSheetCsvUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;

const getSheetXlsxUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx&gid=${gid}`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/data');
mkdirSync(outDir, { recursive: true });

const [csvResponse, xlsxResponse] = await Promise.all([
  fetch(getSheetCsvUrl(MARINE_OZ_PLAYERS_SPREADSHEET_ID, MARINE_OZ_PLAYERS_SHEET_GID)),
  fetch(getSheetXlsxUrl(MARINE_OZ_PLAYERS_SPREADSHEET_ID, MARINE_OZ_PLAYERS_SHEET_GID)),
]);

if (!csvResponse.ok) {
  throw new Error(`Failed to fetch Marine OZ players sheet (${csvResponse.status})`);
}

const xlsxArrayBuffer = xlsxResponse.ok ? await xlsxResponse.arrayBuffer() : null;
const { players, hasRankColumn, scoreColumnLabel } = parseOzPlayersRankSheet(await csvResponse.text(), xlsxArrayBuffer);
const data = {
  updatedAt: new Date().toISOString(),
  spreadsheetId: MARINE_OZ_PLAYERS_SPREADSHEET_ID,
  sheetGid: MARINE_OZ_PLAYERS_SHEET_GID,
  hasRankColumn,
  scoreColumnLabel,
  players,
};

writeFileSync(join(outDir, 'marine-oz-players.json'), JSON.stringify(data, null, 2), 'utf8');
console.log(`marine-oz-players.json: ${players.length} players`);

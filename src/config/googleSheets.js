export const ACHIEVEMENTS_SPREADSHEET_ID = '18r-SzbIGcPqMzdwqcLgOQIFD5P1C2ZSxomres_3iWw4';

export const INVENTORY_SPREADSHEET_ID = '15vRg4u3qDxKxkS_polQbCME7F2gFX8LnHhKMzNXQVpI';

export const NAVIGATION_SPREADSHEET_ID = '1e-y_ddIUAJoJ_ep4qfA4GuBd8hWksIocqWSdjEsUK1o';

export const NAVIGATION_SHEET_GID = '0';

export const SHOP_SPREADSHEET_ID = '1Y-yHRPy0dLHoZnSrzgzcoj_xb5BcFHdFaH9WiHbSU1A';

export const SHOP_SHEET_GID = '0';

export const CHARACTERS_SPREADSHEET_ID = '1dusDT6o-wpPtRTrEfELY09SwdUxSvls-3AIqQGkQMTM';

export const CHARACTERS_SHEET_GID = '0';

export const getSpreadsheetEditUrl = (spreadsheetId) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?hl=ru`;

export const getSpreadsheetXlsxUrl = (spreadsheetId) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx`;

export const getSheetCsvUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;

export const getSheetXlsxUrl = (spreadsheetId, gid) =>
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx&gid=${gid}`;

/** @deprecated используйте getSpreadsheetEditUrl(ACHIEVEMENTS_SPREADSHEET_ID) */
export const getAchievementsSheetCsvUrl = (gid) =>
  getSheetCsvUrl(ACHIEVEMENTS_SPREADSHEET_ID, gid);

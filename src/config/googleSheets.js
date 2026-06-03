export const ACHIEVEMENTS_SPREADSHEET_ID = '18r-SzbIGcPqMzdwqcLgOQIFD5P1C2ZSxomres_3iWw4';

export const getSpreadsheetEditUrl = () =>
  `https://docs.google.com/spreadsheets/d/${ACHIEVEMENTS_SPREADSHEET_ID}/edit?hl=ru`;

export const getAchievementsSheetCsvUrl = (gid) =>
  `https://docs.google.com/spreadsheets/d/${ACHIEVEMENTS_SPREADSHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`;

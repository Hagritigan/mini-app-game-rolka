import { parseCsv } from './parseCsv';

/**
 * Парсит маркер группы из ячейки A1: [948230785, 888127555, 1195395524]
 */
export function parseSheetChildGids(cellValue) {
  const trimmed = cellValue.trim();
  const match = trimmed.match(/^\[\s*([\d\s,]+)\s*\]$/);

  if (!match) {
    return null;
  }

  const gids = match[1]
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  return gids.length > 0 ? gids : null;
}

export function parseSheetChildGidsFromCsv(csvText) {
  const rows = parseCsv(csvText);
  const firstCell = (rows[0]?.[0] || '').trim();

  return parseSheetChildGids(firstCell);
}

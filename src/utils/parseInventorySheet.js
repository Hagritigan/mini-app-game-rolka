import { parseCsv } from './parseCsv';
import { parseSpreadsheetImageUrl } from './parseSpreadsheetImageUrl';

/**
 * Колонки таблицы снаряжения:
 * A — название, B — описание, C — изображение снаряжения, D — картинка владельца
 */
export function parseInventoryFromCsv(csvText, sheetId = 'default') {
  const rows = parseCsv(csvText);
  const items = [];

  rows.forEach((row, index) => {
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();

    const title = normalize(row[0] || '');
    const description = normalize(row[1] || '');
    const equipmentImage = parseSpreadsheetImageUrl(row[2] || '');
    const ownerImage = parseSpreadsheetImageUrl(row[3] || '');

    if (!title && !description && !equipmentImage && !ownerImage) {
      return;
    }

    items.push({
      id: `${sheetId}-${index}-${title.slice(0, 24) || index}`,
      title,
      description,
      equipmentImage,
      ownerImage,
    });
  });

  return items;
}

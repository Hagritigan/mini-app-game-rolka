import { parseCsv } from './parseCsv';
import { parseSpreadsheetImageUrl } from './parseSpreadsheetImageUrl';
import { parseSpreadsheetOwnerField } from './parseSpreadsheetOwnerField';

/**
 * Колонки таблицы снаряжения:
 * A — название, B — описание, C — изображение снаряжения, D — владелец (имя со ссылкой)
 */
export function parseInventoryFromCsv(csvText, sheetId = 'default', ownerUrlsByRow = null) {
  const rows = parseCsv(csvText);
  const items = [];

  rows.forEach((row, index) => {
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();

    const title = normalize(row[0] || '');
    const description = normalize(row[1] || '');
    const equipmentImage = parseSpreadsheetImageUrl(row[2] || '');
    const { ownerName, ownerUrl: ownerUrlFromCell } = parseSpreadsheetOwnerField(row[3] || '');
    const ownerUrl = ownerUrlsByRow?.get(index + 1) || ownerUrlFromCell;

    if (!title && !description && !equipmentImage && !ownerName) {
      return;
    }

    items.push({
      id: `${sheetId}-${index}-${title.slice(0, 24) || index}`,
      title,
      description,
      equipmentImage,
      ownerName,
      ownerUrl,
    });
  });

  return items;
}

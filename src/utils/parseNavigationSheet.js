import { parseCsv } from './parseCsv';
import { normalizeTopicLink } from './normalizeTopicLink';

function normalizeCell(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Колонки таблицы навигации:
 * A — название, B — ссылка на тему, C — присутствие Дозора, D — присутствие ПП
 */
export function parseNavigationSheet(csvText) {
  const rows = parseCsv(csvText).slice(1);
  const items = [];
  const byLink = {};

  rows.forEach((row, index) => {
    const title = normalizeCell(row[0]);
    const link = normalizeCell(row[1]);
    const dozor = normalizeCell(row[2]);
    const pp = normalizeCell(row[3]);

    if (!link) {
      return;
    }

    const item = {
      id: `navigation-${index}-${normalizeTopicLink(link)}`,
      title,
      link,
      dozor,
      pp,
      hasDozor: Boolean(dozor),
      hasPp: Boolean(pp),
    };

    items.push(item);
    byLink[normalizeTopicLink(link)] = item;
  });

  return { items, byLink };
}

export function getNavigationMetaForLink(byLink, link) {
  if (!byLink || !link) {
    return null;
  }

  return byLink[normalizeTopicLink(link)] ?? null;
}

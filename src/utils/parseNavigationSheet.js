import { parseCsv } from './parseCsv.js';
import { normalizeTopicLink } from './normalizeTopicLink.js';
import { buildInfluenceColumns } from './navigationSheetColumns.js';
import { parseXlsxNavigationFills } from './parseXlsxNavigationFills.js';

export const DEFAULT_INFLUENCE_COLORS = {
  dozor: '#11bd67',
  pp: '#9a3d52',
};

function normalizeCell(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getLegacyInfluenceFields(influences) {
  const dozorInfluence = influences.find((influence) => influence.id === 'dozor');
  const ppInfluence = influences.find((influence) => influence.id === 'pp');

  return {
    dozor: dozorInfluence?.text ?? '',
    pp: ppInfluence?.text ?? '',
    hasDozor: Boolean(dozorInfluence?.text),
    hasPp: Boolean(ppInfluence?.text),
    dozorColor: dozorInfluence?.color,
    ppColor: ppInfluence?.color,
  };
}

function buildInfluencesForRow(row, influenceColumns) {
  return influenceColumns
    .map((column, index) => {
      const text = normalizeCell(row[2 + index]);

      if (!text) {
        return null;
      }

      return {
        id: column.id,
        label: column.label,
        column: column.column,
        text,
      };
    })
    .filter(Boolean);
}

/**
 * Колонки таблицы навигации:
 * A — название, B — ссылка, C+ — стороны с влиянием (заголовок = название стороны).
 */
export function parseNavigationSheet(csvText) {
  const rows = parseCsv(csvText);
  const headerRow = rows[0] ?? [];
  const dataRows = rows.slice(1);
  const influenceColumns = buildInfluenceColumns(headerRow);
  const items = [];
  const byLink = {};

  dataRows.forEach((row, index) => {
    const title = normalizeCell(row[0]);
    const link = normalizeCell(row[1]);
    const influences = buildInfluencesForRow(row, influenceColumns);

    if (!link) {
      return;
    }

    const item = {
      id: `navigation-${index}-${normalizeTopicLink(link)}`,
      title,
      link,
      influences,
      ...getLegacyInfluenceFields(influences),
    };

    items.push(item);
    byLink[normalizeTopicLink(link)] = item;
  });

  return { items, byLink, influenceColumns };
}

export function applyNavigationSheetColors(items, arrayBuffer, influenceColumns) {
  const {
    columnDefaults,
    rowColors,
    influenceColumns: parsedColumns,
  } = parseXlsxNavigationFills(arrayBuffer, influenceColumns);

  const columns = parsedColumns ?? influenceColumns ?? [];
  const palette = {};

  items.forEach((item, index) => {
    const rowFill = rowColors.get(index + 2) ?? {};

    item.influences = item.influences.map((influence) => {
      const columnMeta = columns.find((column) => column.column === influence.column);
      const defaultColor = columnDefaults[influence.column]
        ?? DEFAULT_INFLUENCE_COLORS[influence.id]
        ?? null;
      const color = rowFill[influence.column] ?? defaultColor;

      if (color && !palette[influence.id]) {
        palette[influence.id] = color;
      }

      return {
        ...influence,
        label: columnMeta?.label ?? influence.label,
        color,
      };
    });

    Object.assign(item, getLegacyInfluenceFields(item.influences));
  });

  return {
    influenceColumns: columns,
    columnColors: columnDefaults,
    palette,
    dozorColor: columnDefaults.C ?? palette.dozor ?? DEFAULT_INFLUENCE_COLORS.dozor,
    ppColor: columnDefaults.D ?? palette.pp ?? DEFAULT_INFLUENCE_COLORS.pp,
  };
}

export function getNavigationMetaForLink(byLink, link) {
  if (!byLink || !link) {
    return null;
  }

  return byLink[normalizeTopicLink(link)] ?? null;
}

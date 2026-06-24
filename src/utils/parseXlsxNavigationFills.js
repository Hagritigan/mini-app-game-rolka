import { unzipSync } from 'fflate';
import { columnIndexToLetter, slugifyInfluenceId } from './navigationSheetColumns.js';

function decodeXml(text) {
  return new TextDecoder().decode(text);
}

function normalizeHeaderLabel(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseSharedStrings(sharedStringsXml) {
  if (!sharedStringsXml) {
    return [];
  }

  const strings = [];
  const siRegex = /<si>([\s\S]*?)<\/si>/g;
  let match;

  while ((match = siRegex.exec(sharedStringsXml))) {
    const text = [...match[1].matchAll(/<t[^>]*>([^<]*)<\/t>/g)]
      .map((part) => part[1])
      .join('');
    strings.push(text);
  }

  return strings;
}

function parseSheetCellTexts(sheetXml, sharedStrings) {
  const values = new Map();
  const cellRegex = /<c r="([A-Z]+)(\d+)"([^/>]*)(?:\/>|>(?:<v>([^<]*)<\/v>)?<\/c>)/g;
  let match;

  while ((match = cellRegex.exec(sheetXml))) {
    const [, column, row, attrs, rawValue] = match;
    let text = rawValue ?? '';

    if (attrs.includes('t="s"')) {
      text = sharedStrings[Number(rawValue)] ?? '';
    }

    values.set(`${column}${row}`, text);
  }

  return values;
}

function buildInfluenceColumnsFromHeaderRow(sheetXml, sharedStrings) {
  const cellTexts = parseSheetCellTexts(sheetXml, sharedStrings);
  const columns = [];

  for (let columnIndex = 2; columnIndex < 52; columnIndex += 1) {
    const column = columnIndexToLetter(columnIndex);
    const label = normalizeHeaderLabel(cellTexts.get(`${column}1`));

    if (!label) {
      break;
    }

    columns.push({
      column,
      label,
      id: slugifyInfluenceId(label, columnIndex - 2),
    });
  }

  return columns;
}

function parseArgbColor(value) {
  if (!value) {
    return null;
  }

  const rgb = value.replace(/^FF/i, '');

  if (!/^[0-9A-Fa-f]{6}$/.test(rgb)) {
    return null;
  }

  return `#${rgb.toLowerCase()}`;
}

function parseFills(stylesXml) {
  const block = stylesXml.match(/<fills[^>]*>([\s\S]*?)<\/fills>/)?.[1] ?? '';
  const fills = [];
  const fillRegex = /<fill>([\s\S]*?)<\/fill>/g;
  let match;

  while ((match = fillRegex.exec(block))) {
    const fillContent = match[1];
    const patternType = fillContent.match(/patternType="([^"]+)"/)?.[1];

    if (patternType !== 'solid') {
      fills.push(null);
      continue;
    }

    const fgColor = fillContent.match(/<fgColor rgb="([^"]+)"/)?.[1];
    fills.push(parseArgbColor(fgColor));
  }

  return fills;
}

function parseCellXfs(stylesXml) {
  const block = stylesXml.match(/<cellXfs[^>]*>([\s\S]*?)<\/cellXfs>/)?.[1] ?? '';
  const xfs = [];
  const xfRegex = /<xf\s+([^>]+?)(?:\/>|>)/g;
  let match;

  while ((match = xfRegex.exec(block))) {
    const fillId = match[1].match(/fillId="(\d+)"/)?.[1];
    xfs.push(fillId ? Number(fillId) : 0);
  }

  return xfs;
}

function parseCellStyleIndexes(sheetXml) {
  const styles = new Map();
  const cellRegex = /<c r="([A-Z]+)(\d+)"([^/>]*)(?:\/>|>)/g;
  let match;

  while ((match = cellRegex.exec(sheetXml))) {
    const styleIndex = match[3].match(/\ss="(\d+)"/)?.[1];

    if (styleIndex) {
      styles.set(`${match[1]}${match[2]}`, Number(styleIndex));
    }
  }

  return styles;
}

function resolveCellFillColor(cellRef, cellStyles, xfs, fills) {
  const styleIndex = cellStyles.get(cellRef);

  if (styleIndex === undefined) {
    return null;
  }

  const fillId = xfs[styleIndex];
  const color = fills[fillId];

  return color || null;
}

function findMaxRow(cellStyles) {
  let maxRow = 1;

  cellStyles.forEach((_, cellRef) => {
    const row = Number(cellRef.replace(/^[A-Z]+/, ''));

    if (row > maxRow) {
      maxRow = row;
    }
  });

  return maxRow;
}

function getDefaultInfluenceColumns() {
  return ['C', 'D'].map((column, index) => ({
    column,
    label: index === 0 ? 'Присутствие Дозора' : 'Присутствие ПП',
    id: index === 0 ? 'dozor' : 'pp',
  }));
}

/**
 * Читает цвета заливки из XLSX-экспорта Google Sheets.
 * Для каждой колонки влияния берётся цвет заголовка (строка 1),
 * для строки острова — собственная заливка ячейки, если есть.
 */
export function parseXlsxNavigationFills(arrayBuffer, influenceColumns = getDefaultInfluenceColumns()) {
  const files = unzipSync(new Uint8Array(arrayBuffer));
  const stylesXml = decodeXml(files['xl/styles.xml']);
  const sheetXml = decodeXml(files['xl/worksheets/sheet1.xml']);
  const sharedStrings = parseSharedStrings(
    files['xl/sharedStrings.xml'] ? decodeXml(files['xl/sharedStrings.xml']) : '',
  );
  const fills = parseFills(stylesXml);
  const xfs = parseCellXfs(stylesXml);
  const cellStyles = parseCellStyleIndexes(sheetXml);

  const resolvedColumns = buildInfluenceColumnsFromHeaderRow(sheetXml, sharedStrings);
  const columns = resolvedColumns.length > 0 ? resolvedColumns : influenceColumns;

  const getColor = (cellRef) => resolveCellFillColor(cellRef, cellStyles, xfs, fills);

  const columnDefaults = Object.fromEntries(
    columns.map((column) => [
      column.column,
      getColor(`${column.column}1`),
    ]),
  );

  const rowColors = new Map();
  const maxRow = findMaxRow(cellStyles);

  for (let row = 2; row <= maxRow; row += 1) {
    const colors = Object.fromEntries(
      columns.map((column) => [
        column.column,
        getColor(`${column.column}${row}`),
      ]),
    );

    if (Object.values(colors).some(Boolean)) {
      rowColors.set(row, colors);
    }
  }

  return { columnDefaults, rowColors, influenceColumns: columns };
}

export function getInfluenceColumnLetters(influenceColumns) {
  return influenceColumns.map((column) => column.column);
}

export function getLastInfluenceColumnLetter(influenceColumns) {
  const lastIndex = 1 + influenceColumns.length;

  return columnIndexToLetter(lastIndex);
}

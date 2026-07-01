import { unzipSync } from 'fflate';

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

function decodeCellValue(rawValue, attrs, sharedStrings) {
  if (attrs.includes('t="s"')) {
    return sharedStrings[Number(rawValue)] ?? '';
  }

  if (rawValue == null || rawValue === '') {
    return '';
  }

  const num = Number(rawValue);

  if (Number.isFinite(num) && Math.floor(num) === num) {
    return String(Math.trunc(num));
  }

  return String(rawValue);
}

export function parseXlsxColumnCells(arrayBuffer, column, startRow = 2) {
  const files = unzipSync(new Uint8Array(arrayBuffer));
  const sharedStrings = parseSharedStrings(
    files['xl/sharedStrings.xml']
      ? new TextDecoder().decode(files['xl/sharedStrings.xml'])
      : '',
  );
  const sheetXml = new TextDecoder().decode(files['xl/worksheets/sheet1.xml']);
  const byRow = new Map();
  const cellRegex = new RegExp(`<c r="${column}(\\d+)"([^>]*)>([\\s\\S]*?)</c>`, 'g');
  let match;

  while ((match = cellRegex.exec(sheetXml))) {
    const row = Number(match[1]);

    if (row < startRow) {
      continue;
    }

    const attrs = match[2];
    const valueMatch = match[3].match(/<v>([^<]*)<\/v>/);
    const rawValue = valueMatch?.[1] ?? '';

    byRow.set(row, decodeCellValue(rawValue, attrs, sharedStrings));
  }

  return byRow;
}

export function parseXlsxHyperlinks(arrayBuffer) {
  const files = unzipSync(new Uint8Array(arrayBuffer));
  const sheetXml = new TextDecoder().decode(files['xl/worksheets/sheet1.xml']);
  const relsXml = files['xl/worksheets/_rels/sheet1.xml.rels']
    ? new TextDecoder().decode(files['xl/worksheets/_rels/sheet1.xml.rels'])
    : '';
  const relMap = new Map();
  const relRegex = /<Relationship Id="([^"]+)"[^>]*Target="([^"]+)"[^>]*\/>/g;
  let relMatch;

  while ((relMatch = relRegex.exec(relsXml))) {
    relMap.set(relMatch[1], relMatch[2].replace(/&amp;/g, '&'));
  }

  const byRef = new Map();
  const hyperlinkRegex = /<hyperlink r:id="([^"]+)" ref="([^"]+)"\/>/g;
  let hyperlinkMatch;

  while ((hyperlinkMatch = hyperlinkRegex.exec(sheetXml))) {
    const url = relMap.get(hyperlinkMatch[1]);

    if (url) {
      byRef.set(hyperlinkMatch[2], url);
    }
  }

  return byRef;
}

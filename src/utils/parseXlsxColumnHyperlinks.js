import { unzipSync } from 'fflate';

function decodeXmlEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

function parseRelationshipTargets(relsXml) {
  const rels = new Map();
  const regex = /Id="([^"]+)"[^>]*Target="([^"]+)"/g;
  let match;

  while ((match = regex.exec(relsXml))) {
    rels.set(match[1], decodeXmlEntities(match[2]));
  }

  return rels;
}

function parseSheetHyperlinks(sheetXml, rels) {
  const links = new Map();
  const tagRegex = /<hyperlink\s+([^/>]+)\/?>/g;
  let match;

  while ((match = tagRegex.exec(sheetXml))) {
    const attrs = match[1];
    const refMatch = attrs.match(/ref="([A-Z]+)(\d+)"/);
    const idMatch = attrs.match(/r:id="([^"]+)"/);

    if (!refMatch || !idMatch) {
      continue;
    }

    const url = rels.get(idMatch[1]);
    if (url) {
      links.set(`${refMatch[1]}${refMatch[2]}`, url);
    }
  }

  return links;
}

/**
 * Извлекает гиперссылки из XLSX-экспорта Google Sheets для указанного столбца.
 * Возвращает Map: номер строки (1-based) → URL.
 */
export function parseXlsxColumnHyperlinks(arrayBuffer, column = 'D') {
  const files = unzipSync(new Uint8Array(arrayBuffer));
  const sheetXml = new TextDecoder().decode(files['xl/worksheets/sheet1.xml']);
  const relsXml = new TextDecoder().decode(files['xl/worksheets/_rels/sheet1.xml.rels']);
  const rels = parseRelationshipTargets(relsXml);
  const allLinks = parseSheetHyperlinks(sheetXml, rels);
  const columnLinks = new Map();

  allLinks.forEach((url, cellRef) => {
    if (!cellRef.startsWith(column)) {
      return;
    }

    const row = Number(cellRef.slice(column.length));
    if (row > 0) {
      columnLinks.set(row, url);
    }
  });

  return columnLinks;
}

import { unzipSync } from 'fflate';

/**
 * Возвращает названия листов из XLSX-экспорта таблицы (в порядке вкладок).
 */
export function parseXlsxSheetNames(arrayBuffer) {
  const files = unzipSync(new Uint8Array(arrayBuffer));
  const workbookXml = new TextDecoder().decode(files['xl/workbook.xml']);
  const names = [];
  const regex = /<sheet[^>]*\bname="([^"]+)"/g;
  let match;

  while ((match = regex.exec(workbookXml))) {
    names.push(match[1]);
  }

  return names;
}

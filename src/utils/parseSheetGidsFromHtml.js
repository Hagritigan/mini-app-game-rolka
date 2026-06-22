/**
 * Извлекает gid листов из HTML страницы Google Sheets.
 * На мобильной версии страницы метаданные листов приходят в этом формате.
 */
export function parseSheetGidsFromHtml(html) {
  const gids = [];
  const seen = new Set();
  const regex = /gid[=:]([0-9]+)/g;
  let match;

  while ((match = regex.exec(html))) {
    const gid = match[1];

    if (!seen.has(gid)) {
      seen.add(gid);
      gids.push(gid);
    }
  }

  return gids;
}

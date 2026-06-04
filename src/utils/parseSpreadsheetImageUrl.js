/** URL из ячейки: прямая ссылка или формула =IMAGE("…") */
export function parseSpreadsheetImageUrl(value) {
  const trimmed = String(value || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!trimmed) {
    return '';
  }

  const match = trimmed.match(/https?:\/\/[^\s")\]]+/i);
  return match ? match[0] : '';
}

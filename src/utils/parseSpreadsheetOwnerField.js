import { parseSpreadsheetImageUrl } from './parseSpreadsheetImageUrl';

/**
 * Поле владельца: имя или формула =HYPERLINK("url", "имя").
 */
export function parseSpreadsheetOwnerField(value) {
  const trimmed = String(value || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!trimmed) {
    return { ownerName: '', ownerUrl: '' };
  }

  const hyperlinkMatch = trimmed.match(
    /^=HYPERLINK\s*\(\s*"([^"]+)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\)$/i,
  );

  if (hyperlinkMatch) {
    return {
      ownerUrl: hyperlinkMatch[1],
      ownerName: hyperlinkMatch[2].replace(/""/g, '"').trim(),
    };
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return {
      ownerUrl: parseSpreadsheetImageUrl(trimmed),
      ownerName: '',
    };
  }

  return { ownerName: trimmed, ownerUrl: '' };
}

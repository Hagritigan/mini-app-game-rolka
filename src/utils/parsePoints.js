/**
 * Разбивает поле награды на число и описание.
 * Поддерживает: "3 балла", "100.000.000 белли", "1 000 000 награда".
 */
export function parsePoints(points) {
  const trimmed = points.trim().replace(/\s+/g, ' ');

  const match = trimmed.match(/^(\d{1,3}(?:\.\d{3})+|\d{1,3}(?: \d{3})+|\d+)(?:\s+(.+))?$/);

  if (match) {
    return {
      value: match[1],
      label: (match[2] || '').trim() || null,
    };
  }

  return { value: null, label: trimmed };
}

const KNOWN_INFLUENCE_IDS = {
  'присутствие дозора': 'dozor',
  'присутствие пп': 'pp',
};

export function columnIndexToLetter(index) {
  let current = index;
  let letters = '';

  while (current >= 0) {
    letters = String.fromCharCode((current % 26) + 65) + letters;
    current = Math.floor(current / 26) - 1;
  }

  return letters;
}

export function slugifyInfluenceId(label, columnIndex) {
  const normalized = String(label || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  if (KNOWN_INFLUENCE_IDS[normalized]) {
    return KNOWN_INFLUENCE_IDS[normalized];
  }

  if (normalized.includes('дозор')) {
    return 'dozor';
  }

  if (normalized.includes('пп') || normalized.includes('подполь')) {
    return 'pp';
  }

  const slug = normalized
    .replace(/[^a-zа-яё0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');

  return slug || `influence-${columnIndexToLetter(2 + columnIndex).toLowerCase()}`;
}

export function buildInfluenceColumns(headerRow) {
  return (headerRow ?? []).slice(2).map((label, index) => {
    const normalizedLabel = String(label || '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!normalizedLabel) {
      return null;
    }

    return {
      column: columnIndexToLetter(2 + index),
      label: normalizedLabel,
      id: slugifyInfluenceId(normalizedLabel, index),
    };
  }).filter(Boolean);
}

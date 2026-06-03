import { parseCsv } from './parseCsv';

/**
 * Колонки таблицы:
 * A — иконка, B — название, C — условие, D — примечание, E — баллы
 */
export function parseAchievementsFromCsv(csvText, sheetId = 'default') {
  const rows = parseCsv(csvText);
  const achievements = [];

  rows.forEach((row, index) => {
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();

    const icon = normalize(row[0] || '');
    const title = normalize(row[1] || '');
    const description = normalize(row[2] || '');
    const note = normalize(row[3] || '');
    const points = normalize(row[4] || '');

    if (!title && !description) {
      return;
    }

    achievements.push({
      id: `${sheetId}-${index}-${title.slice(0, 24)}`,
      icon,
      title,
      description,
      note,
      points,
    });
  });

  return achievements;
}

export function mergeAchievements(lists) {
  const seen = new Set();
  const merged = [];

  lists.flat().forEach((item) => {
    const key = `${item.title}|${item.description}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    merged.push(item);
  });

  return merged;
}

import { parseCsv } from './parseCsv.js';

function normalize(value) {
  return String(value ?? '').replace(/\r/g, '').replace(/\s+/g, ' ').trim();
}

function isHeaderRow(row) {
  const playerName = normalize(row[1]).toLowerCase();
  const characterName = normalize(row[3]).toLowerCase();

  return playerName === 'игрок' && characterName === 'персонаж';
}

/**
 * Колонки таблицы персонажей:
 * B — игрок, D — персонаж, F — личное дело
 */
export function parseCharactersSheet(csvText) {
  const rows = parseCsv(csvText);
  const characters = [];

  rows.forEach((row, index) => {
    if (index === 0 && isHeaderRow(row)) {
      return;
    }

    const playerName = normalize(row[1]);
    const characterName = normalize(row[3]);
    const personalFileLink = normalize(row[5]);

    if (!characterName) {
      return;
    }

    characters.push({
      id: `${index}-${characterName}`,
      playerName,
      characterName,
      personalFileLink,
    });
  });

  return characters;
}

export function filterCharacters(characters, query, limit = 8) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return characters
    .filter((character) => {
      const haystack = `${character.characterName} ${character.playerName}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    })
    .slice(0, limit);
}

export function findCharacterByName(characters, characterName) {
  const normalizedName = characterName.trim().toLowerCase();

  if (!normalizedName) {
    return null;
  }

  return characters.find((character) => character.characterName.toLowerCase() === normalizedName) ?? null;
}

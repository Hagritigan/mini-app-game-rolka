import { parseCsv } from './parseCsv.js';
import { parseXlsxColumnCells, parseXlsxHyperlinks } from './parseXlsxColumnCells.js';

function normalize(value) {
  return String(value ?? '').replace(/\r/g, '').replace(/\s+/g, ' ').trim();
}

function isHeaderRow(cells) {
  const first = cells[0]?.toLowerCase() ?? '';
  const second = cells[1]?.toLowerCase() ?? '';

  return first === '№' || /имя персонажа/i.test(second);
}

function getHeaderRow(rows) {
  if (rows.length === 0) {
    return [];
  }

  const firstRow = rows[0].map(normalize);

  if (isHeaderRow(firstRow)) {
    return firstRow;
  }

  return firstRow;
}

function detectSheetFormat(rows) {
  const header = getHeaderRow(rows);
  const hasRankColumn = header.some((cell) => /звание/i.test(cell));
  const scoreColumnLabel = header.find((cell) => /кол-во\s*о[зв]/i.test(cell)) ?? 'Кол-во ОЗ';

  return {
    hasRankColumn,
    pointsColumn: hasRankColumn ? 'E' : 'D',
    scoreColumnLabel,
  };
}

function normalizeOptionalValue(value) {
  const normalized = normalize(value);

  if (!normalized || normalized === '-') {
    return '';
  }

  return normalized;
}

function parsePlayersFromCsv(csvText) {
  const rows = parseCsv(csvText);
  const { hasRankColumn } = detectSheetFormat(rows);
  const players = [];

  rows.forEach((row, index) => {
    const cells = row.map(normalize);

    if (cells.every((cell) => !cell)) {
      return;
    }

    if (index === 0 && isHeaderRow(cells)) {
      return;
    }

    let number;
    let characterName;
    let rank;
    let ozCount;
    let points;
    let personalFileLink;

    if (hasRankColumn) {
      [number, characterName, rank, ozCount, points, personalFileLink] = cells;
    } else {
      [number, characterName, ozCount, points, personalFileLink] = cells;
      rank = '';
    }

    if (!characterName || characterName === '-') {
      return;
    }

    players.push({
      number,
      characterName,
      rank: normalizeOptionalValue(rank),
      ozCount: normalizeOptionalValue(ozCount),
      points: normalizeOptionalValue(points),
      personalFileLink: normalizeOptionalValue(personalFileLink),
    });
  });

  return { players, hasRankColumn };
}

function enrichPlayersFromXlsx(players, xlsxArrayBuffer, pointsColumn) {
  if (!xlsxArrayBuffer || players.length === 0) {
    return players;
  }

  const pointsByRow = parseXlsxColumnCells(xlsxArrayBuffer, pointsColumn, 2);
  const hyperlinks = parseXlsxHyperlinks(xlsxArrayBuffer);

  return players.map((player, index) => {
    const rowNumber = index + 2;
    let next = player;

    if (!next.points) {
      const points = pointsByRow.get(rowNumber);

      if (points) {
        next = { ...next, points };
      }
    }

    const ownerLink = hyperlinks.get(`B${rowNumber}`);

    if (ownerLink) {
      next = { ...next, ownerLink };
    }

    return next;
  });
}

/**
 * Таблица: №, Имя персонажа, [Звание], Кол-во ОЗ, Кол-во Баллов, ЛД.
 * CSV-экспорт Google иногда отдаёт пустые баллы — дополняем из XLSX.
 * Ссылки на страницу владельца — из гиперссылок колонки B в XLSX.
 */
export function parseOzPlayersRankSheet(csvText, xlsxArrayBuffer = null) {
  const rows = parseCsv(csvText);
  const { hasRankColumn, pointsColumn, scoreColumnLabel } = detectSheetFormat(rows);
  const { players } = parsePlayersFromCsv(csvText);

  return {
    players: enrichPlayersFromXlsx(players, xlsxArrayBuffer, pointsColumn),
    hasRankColumn,
    scoreColumnLabel,
  };
}

/** @deprecated используйте parseOzPlayersRankSheet */
export function parseMarineOzPlayersSheet(csvText, xlsxArrayBuffer = null) {
  return parseOzPlayersRankSheet(csvText, xlsxArrayBuffer).players;
}

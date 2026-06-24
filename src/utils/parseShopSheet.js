import { parseCsv } from './parseCsv.js';
import { formatShopPrice, parseShopPriceNumber } from './formatShopPrice.js';

function normalize(value) {
  return String(value ?? '').replace(/\r/g, '').replace(/\s+/g, ' ').trim();
}

function isHeaderRow(cells) {
  const first = cells[0]?.toLowerCase() ?? '';
  return /^(категория|лот|название|наименование|описание|цена)$/.test(first);
}

function isCategoryRow(cells) {
  const [first, second, third] = cells;
  return /^\d+\.\s/.test(first) && !second && !third;
}

function detectWideFormat(rows) {
  return rows.some((row) => {
    const cells = row.map(normalize).filter(Boolean);
    return cells.length >= 5;
  });
}

/**
 * Форматы таблицы:
 * - 3 колонки: A название, B описание, C цена
 * - 5 колонок: A категория, B лот, C название, D описание, E цена
 * Строка вида «1. Оружие» без остальных ячеек задаёт категорию для следующих товаров.
 */
export function parseShopSheet(csvText) {
  const rows = parseCsv(csvText);
  const items = [];
  let currentCategory = '';
  const wideFormat = detectWideFormat(rows);

  rows.forEach((row, index) => {
    const cells = row.map(normalize);

    if (cells.every((cell) => !cell)) {
      return;
    }

    if (index === 0 && isHeaderRow(cells)) {
      return;
    }

    if (isCategoryRow(cells)) {
      currentCategory = cells[0];
      return;
    }

    let category = currentCategory;
    let lot = '';
    let name = '';
    let description = '';
    let priceRaw = '';

    if (wideFormat) {
      [category, lot, name, description, priceRaw] = cells;
      if (!category && currentCategory) {
        category = currentCategory;
      }
    } else {
      [name, description, priceRaw] = cells;
      category = currentCategory;
    }

    if (!name) {
      return;
    }

    items.push({
      id: `${lot || index}-${name.slice(0, 24)}`,
      category: category || '',
      lot,
      name,
      description,
      price: formatShopPrice(priceRaw),
      priceNumber: parseShopPriceNumber(priceRaw),
    });
  });

  return items;
}

export function groupShopItemsByCategory(items) {
  const groups = [];
  const groupMap = new Map();

  items.forEach((item) => {
    const key = item.category || 'Без категории';

    if (!groupMap.has(key)) {
      const group = { category: key, items: [] };
      groupMap.set(key, group);
      groups.push(group);
    }

    groupMap.get(key).items.push(item);
  });

  return groups;
}

export function filterShopItems(items, query) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return items;
  }

  return items.filter((item) => {
    const haystack = [
      item.category,
      item.lot,
      item.name,
      item.description,
      item.price,
    ].join(' ').toLowerCase();

    return haystack.includes(normalized);
  });
}

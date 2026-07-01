import { RA_NPC_WIKI_PAGE_URL } from '../config/raNpc';
import { loadStaticCache } from './cache/cacheUtils';

export async function fetchRaNpcData() {
  const response = await fetch(`./data/ra-npc-list.json?ts=${Date.now()}`);

  if (!response.ok) {
    throw new Error(`Не удалось загрузить список NPC РА (${response.status})`);
  }

  return response.json();
}

export async function fetchFreshRaNpcData() {
  return fetchRaNpcData();
}

export async function loadRaNpcStaticCache() {
  return loadStaticCache('./data/ra-npc-list.json');
}

export { RA_NPC_WIKI_PAGE_URL };

import { createDataStore } from './createDataStore.js';
import { fetchFreshAchievementsData } from './fetchFreshAchievementsData.js';
import { fetchFreshInventoryData } from './fetchFreshInventoryData.js';

export const achievementsDataStore = createDataStore({
  cacheUrl: './data/achievements.json',
  storageKey: 'rolka:achievements-data',
  fetchFresh: fetchFreshAchievementsData,
});

export const inventoryDataStore = createDataStore({
  cacheUrl: './data/inventory.json',
  storageKey: 'rolka:inventory-data',
  fetchFresh: fetchFreshInventoryData,
});

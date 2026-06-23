import { createDataStore } from './createDataStore.js';
import { fetchFreshAchievementsData } from './fetchFreshAchievementsData.js';
import { fetchFreshInventoryData } from './fetchFreshInventoryData.js';
import { fetchFreshNavigationData } from './fetchFreshNavigationData.js';

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

export const navigationDataStore = createDataStore({
  cacheUrl: './data/navigation.json',
  storageKey: 'rolka:navigation-data',
  fetchFresh: fetchFreshNavigationData,
});

import { createDataStore } from './createDataStore.js';
import { fetchFreshAchievementsData } from './fetchFreshAchievementsData.js';
import { fetchFreshInventoryData } from './fetchFreshInventoryData.js';
import { fetchFreshNavigationData } from './fetchFreshNavigationData.js';

import { fetchFreshShopData } from './fetchFreshShopData.js';

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

export const shopDataStore = createDataStore({
  cacheUrl: './data/shop.json',
  storageKey: 'rolka:shop-data',
  fetchFresh: fetchFreshShopData,
});

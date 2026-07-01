import { createDataStore } from './createDataStore.js';
import { fetchFreshAchievementsData } from './fetchFreshAchievementsData.js';
import { fetchFreshInventoryData } from './fetchFreshInventoryData.js';
import { fetchFreshNavigationData } from './fetchFreshNavigationData.js';

import { fetchFreshCharactersData } from './fetchFreshCharactersData.js';
import { fetchFreshCpOzPlayersData } from './fetchFreshCpOzPlayersData.js';
import { fetchFreshMarineOzPlayersData } from './fetchFreshMarineOzPlayersData.js';
import { fetchFreshRaNpcData } from './fetchFreshRaNpcData.js';
import { fetchFreshRaOzPlayersData } from './fetchFreshRaOzPlayersData.js';
import { fetchFreshShichibukaiOzPlayersData } from './fetchFreshShichibukaiOzPlayersData.js';
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

export const charactersDataStore = createDataStore({
  cacheUrl: './data/characters.json',
  storageKey: 'rolka:characters-data',
  fetchFresh: fetchFreshCharactersData,
});

export const marineOzPlayersDataStore = createDataStore({
  cacheUrl: './data/marine-oz-players.json',
  storageKey: 'rolka:marine-oz-players-data',
  fetchFresh: fetchFreshMarineOzPlayersData,
});

export const raOzPlayersDataStore = createDataStore({
  cacheUrl: './data/ra-oz-players.json',
  storageKey: 'rolka:ra-oz-players-data',
  fetchFresh: fetchFreshRaOzPlayersData,
});

export const raNpcDataStore = createDataStore({
  cacheUrl: './data/ra-npc-list.json',
  storageKey: 'rolka:ra-npc-list-data',
  fetchFresh: fetchFreshRaNpcData,
});

export const cpOzPlayersDataStore = createDataStore({
  cacheUrl: './data/cp-oz-players.json',
  storageKey: 'rolka:cp-oz-players-data',
  fetchFresh: fetchFreshCpOzPlayersData,
});

export const shichibukaiOzPlayersDataStore = createDataStore({
  cacheUrl: './data/shichibukai-oz-players.json',
  storageKey: 'rolka:shichibukai-oz-players-data',
  fetchFresh: fetchFreshShichibukaiOzPlayersData,
});

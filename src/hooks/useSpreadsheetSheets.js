import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { achievementsDataStore, inventoryDataStore } from '../api/cache';
import { ACHIEVEMENTS_SPREADSHEET_ID, INVENTORY_SPREADSHEET_ID } from '../config/googleSheets';

function getStoreForSpreadsheet(spreadsheetId) {
  if (spreadsheetId === INVENTORY_SPREADSHEET_ID) {
    return inventoryDataStore;
  }

  return achievementsDataStore;
}

export function useSpreadsheetSheets(spreadsheetId = ACHIEVEMENTS_SPREADSHEET_ID) {
  const store = getStoreForSpreadsheet(spreadsheetId);
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  useEffect(() => {
    store.ensureLoaded();
  }, [store]);

  const structure = state.data?.structure;
  const rootSheets = structure?.rootSheets ?? [];
  const allSheets = structure?.allSheets ?? [];
  const sheetsByGid = structure?.sheetsByGid ?? {};

  const getSheetByGid = useCallback(
    (gid) => sheetsByGid[gid] ?? allSheets.find((sheet) => sheet.gid === gid),
    [allSheets, sheetsByGid],
  );

  const getChildSheets = useCallback(
    (childGids) =>
      (childGids || [])
        .map((gid) => getSheetByGid(String(gid)))
        .filter(Boolean),
    [getSheetByGid],
  );

  const reload = useCallback(() => {
    store.reload();
  }, [store]);

  return {
    sheets: rootSheets,
    rootSheets,
    allSheets,
    sheetsByGid,
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    reload,
    getSheetByGid,
    getChildSheets,
  };
}

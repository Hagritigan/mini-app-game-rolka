import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { inventoryDataStore } from '../api/cache';

export function useInventorySheet(gid) {
  const state = useSyncExternalStore(
    inventoryDataStore.subscribe,
    inventoryDataStore.getState,
    inventoryDataStore.getState,
  );

  useEffect(() => {
    inventoryDataStore.ensureLoaded();
  }, []);

  const items = gid ? (state.data?.sheets?.[gid]?.items ?? []) : [];
  const hasCachedSheet = Boolean(gid && state.data?.sheets?.[gid]);
  const loading = state.loading || (Boolean(gid) && !hasCachedSheet && !state.error);

  const reload = useCallback(() => {
    inventoryDataStore.reload();
  }, []);

  return {
    items,
    loading,
    refreshing: state.refreshing,
    error: state.error,
    reload,
  };
}

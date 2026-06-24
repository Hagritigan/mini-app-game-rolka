import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { shopDataStore } from '../api/cache';

export function useShopData() {
  const state = useSyncExternalStore(
    shopDataStore.subscribe,
    shopDataStore.getState,
    shopDataStore.getState,
  );

  useEffect(() => {
    shopDataStore.ensureLoaded();
  }, []);

  const reload = useCallback(() => {
    shopDataStore.reload();
  }, []);

  return {
    items: state.data?.items ?? [],
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    reload,
  };
}

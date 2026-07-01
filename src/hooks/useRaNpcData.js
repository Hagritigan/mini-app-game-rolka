import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { raNpcDataStore } from '../api/cache';

export function useRaNpcData() {
  const state = useSyncExternalStore(
    raNpcDataStore.subscribe,
    raNpcDataStore.getState,
    raNpcDataStore.getState,
  );

  useEffect(() => {
    raNpcDataStore.ensureLoaded();
  }, []);

  const reload = useCallback(() => {
    raNpcDataStore.reload();
  }, []);

  return {
    npcs: state.data?.npcs ?? [],
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    reload,
  };
}

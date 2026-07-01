import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { cpOzPlayersDataStore } from '../api/cache';

export function useCpOzPlayersData() {
  const state = useSyncExternalStore(
    cpOzPlayersDataStore.subscribe,
    cpOzPlayersDataStore.getState,
    cpOzPlayersDataStore.getState,
  );

  useEffect(() => {
    cpOzPlayersDataStore.ensureLoaded();
  }, []);

  const reload = useCallback(() => {
    cpOzPlayersDataStore.reload();
  }, []);

  return {
    players: state.data?.players ?? [],
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    reload,
  };
}

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { marineOzPlayersDataStore } from '../api/cache';

export function useMarineOzPlayersData() {
  const state = useSyncExternalStore(
    marineOzPlayersDataStore.subscribe,
    marineOzPlayersDataStore.getState,
    marineOzPlayersDataStore.getState,
  );

  useEffect(() => {
    marineOzPlayersDataStore.ensureLoaded();
  }, []);

  const reload = useCallback(() => {
    marineOzPlayersDataStore.reload();
  }, []);

  return {
    players: state.data?.players ?? [],
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    reload,
  };
}

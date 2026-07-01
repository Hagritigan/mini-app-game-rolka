import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { raOzPlayersDataStore } from '../api/cache';

export function useRaOzPlayersData() {
  const state = useSyncExternalStore(
    raOzPlayersDataStore.subscribe,
    raOzPlayersDataStore.getState,
    raOzPlayersDataStore.getState,
  );

  useEffect(() => {
    raOzPlayersDataStore.ensureLoaded();
  }, []);

  const reload = useCallback(() => {
    raOzPlayersDataStore.reload();
  }, []);

  return {
    players: state.data?.players ?? [],
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    reload,
  };
}

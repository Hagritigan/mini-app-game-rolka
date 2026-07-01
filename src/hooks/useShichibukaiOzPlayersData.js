import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { shichibukaiOzPlayersDataStore } from '../api/cache';

export function useShichibukaiOzPlayersData() {
  const state = useSyncExternalStore(
    shichibukaiOzPlayersDataStore.subscribe,
    shichibukaiOzPlayersDataStore.getState,
    shichibukaiOzPlayersDataStore.getState,
  );

  useEffect(() => {
    shichibukaiOzPlayersDataStore.ensureLoaded();
  }, []);

  const reload = useCallback(() => {
    shichibukaiOzPlayersDataStore.reload();
  }, []);

  return {
    players: state.data?.players ?? [],
    hasRankColumn: state.data?.hasRankColumn ?? true,
    scoreColumnLabel: state.data?.scoreColumnLabel ?? 'Кол-во ОЗ',
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    reload,
  };
}

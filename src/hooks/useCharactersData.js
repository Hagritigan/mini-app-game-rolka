import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { charactersDataStore } from '../api/cache';

export function useCharactersData() {
  const state = useSyncExternalStore(
    charactersDataStore.subscribe,
    charactersDataStore.getState,
    charactersDataStore.getState,
  );

  useEffect(() => {
    charactersDataStore.ensureLoaded();
  }, []);

  const reload = useCallback(() => {
    charactersDataStore.reload();
  }, []);

  return {
    characters: state.data?.characters ?? [],
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    reload,
  };
}

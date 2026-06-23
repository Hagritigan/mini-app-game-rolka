import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { achievementsDataStore } from '../api/cache';

export function useAchievementsSheet(gid) {
  const state = useSyncExternalStore(
    achievementsDataStore.subscribe,
    achievementsDataStore.getState,
    achievementsDataStore.getState,
  );

  useEffect(() => {
    achievementsDataStore.ensureLoaded();
  }, []);

  const achievements = gid ? (state.data?.sheets?.[gid]?.achievements ?? []) : [];
  const hasCachedSheet = Boolean(gid && state.data?.sheets?.[gid]);
  const loading = state.loading || (Boolean(gid) && !hasCachedSheet && !state.error);

  const reload = useCallback(() => {
    achievementsDataStore.reload();
  }, []);

  return {
    achievements,
    loading,
    refreshing: state.refreshing,
    error: state.error,
    reload,
  };
}

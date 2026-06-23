import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { navigationDataStore } from '../api/cache';
import { getNavigationMetaForLink } from '../utils/parseNavigationSheet';

export function useNavigationMeta() {
  const state = useSyncExternalStore(
    navigationDataStore.subscribe,
    navigationDataStore.getState,
    navigationDataStore.getState,
  );

  useEffect(() => {
    navigationDataStore.ensureLoaded();
  }, []);

  const getMetaForLink = useCallback(
    (link) => getNavigationMetaForLink(state.data?.byLink, link),
    [state.data?.byLink],
  );

  const reload = useCallback(() => {
    navigationDataStore.reload();
  }, []);

  return {
    items: state.data?.items ?? [],
    byLink: state.data?.byLink ?? {},
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    getMetaForLink,
    reload,
  };
}

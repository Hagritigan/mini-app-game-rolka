import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';
import { navigationDataStore } from '../api/cache';
import { getNavigationMetaForLink } from '../utils/parseNavigationSheet';
import { getInfluenceLegendItems } from '../navigation/utils/islandInfluence';

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

  const legendItems = useMemo(
    () => getInfluenceLegendItems(state.data),
    [state.data],
  );

  return {
    items: state.data?.items ?? [],
    byLink: state.data?.byLink ?? {},
    legendItems,
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    getMetaForLink,
    reload,
  };
}

import {
  isDataUpdated,
  loadStaticCache,
  loadStoredCache,
  saveStoredCache,
} from './cacheUtils.js';

export function createDataStore({ cacheUrl, storageKey, fetchFresh }) {
  let state = {
    data: null,
    loading: false,
    refreshing: false,
    error: null,
    initialized: false,
  };
  const listeners = new Set();
  let loadPromise = null;

  function notify() {
    listeners.forEach((listener) => listener(state));
  }

  function setState(patch) {
    state = { ...state, ...patch };
    notify();
  }

  async function refreshInBackground(currentData) {
    setState({ refreshing: true, error: null });

    try {
      const fresh = await fetchFresh();

      if (isDataUpdated(currentData, fresh)) {
        saveStoredCache(storageKey, fresh);
        setState({ data: fresh });
      }
    } catch (err) {
      if (!state.data) {
        setState({
          error: err instanceof Error ? err.message : 'Ошибка загрузки',
        });
      }
    } finally {
      setState({ refreshing: false });
    }
  }

  async function ensureLoaded({ force = false } = {}) {
    if (!force && state.initialized) {
      return state;
    }

    if (loadPromise) {
      await loadPromise;
      return state;
    }

    loadPromise = (async () => {
      const stored = loadStoredCache(storageKey);

      if (stored) {
        setState({ data: stored, loading: false, initialized: true, error: null });
        await refreshInBackground(stored);
        return;
      }

      setState({ loading: true, error: null });

      try {
        const cached = await loadStaticCache(cacheUrl);
        setState({ data: cached, loading: false, initialized: true });
        await refreshInBackground(cached);
      } catch (err) {
        setState({
          data: null,
          loading: false,
          initialized: true,
          error: err instanceof Error ? err.message : 'Ошибка загрузки',
        });
      } finally {
        loadPromise = null;
      }
    })();

    await loadPromise;
    return state;
  }

  async function reload() {
    setState({ loading: !state.data, error: null });

    try {
      const fresh = await fetchFresh();
      saveStoredCache(storageKey, fresh);
      setState({ data: fresh, loading: false, initialized: true, error: null });
    } catch (err) {
      setState({
        loading: false,
        error: err instanceof Error ? err.message : 'Ошибка загрузки',
      });
    }
  }

  function subscribe(listener) {
    listeners.add(listener);
    listener(state);

    return () => {
      listeners.delete(listener);
    };
  }

  return {
    subscribe,
    ensureLoaded,
    reload,
    getState: () => state,
  };
}

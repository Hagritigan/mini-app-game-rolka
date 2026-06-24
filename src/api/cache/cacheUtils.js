export function getComparablePayload(data) {
  if (!data) {
    return '';
  }

  const { updatedAt, ...payload } = data;

  return JSON.stringify(payload);
}

export function isDataUpdated(previous, next) {
  return getComparablePayload(previous) !== getComparablePayload(next);
}

export async function loadStaticCache(cacheUrl) {
  const response = await fetch(cacheUrl);

  if (!response.ok) {
    throw new Error(`Не удалось загрузить кэш (${response.status})`);
  }

  return response.json();
}

export function loadStoredCache(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveStoredCache(storageKey, data) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch {
    // localStorage может быть недоступен
  }
}

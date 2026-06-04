import { useCallback, useEffect, useState } from 'react';
import { fetchInventoryByGid } from '../api/fetchInventoryByGid';
import { INVENTORY_SPREADSHEET_ID } from '../config/googleSheets';

export function useInventorySheet(gid, spreadsheetId = INVENTORY_SPREADSHEET_ID) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!gid) {
      setItems([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchInventoryByGid(gid, spreadsheetId);
      setItems(data);
    } catch (err) {
      setItems([]);
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, [gid, spreadsheetId]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, reload: load };
}

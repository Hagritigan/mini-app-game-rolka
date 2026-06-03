import { useCallback, useEffect, useState } from 'react';
import { fetchSpreadsheetStructure } from '../api/fetchSpreadsheetSheets';

export function useSpreadsheetSheets() {
  const [rootSheets, setRootSheets] = useState([]);
  const [allSheets, setAllSheets] = useState([]);
  const [sheetsByGid, setSheetsByGid] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchSpreadsheetStructure({ force: true });
      setRootSheets(data.rootSheets);
      setAllSheets(data.allSheets);
      setSheetsByGid(data.sheetsByGid);
    } catch (err) {
      setRootSheets([]);
      setAllSheets([]);
      setSheetsByGid({});
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getSheetByGid = useCallback(
    (gid) => sheetsByGid[gid] ?? allSheets.find((sheet) => sheet.gid === gid),
    [allSheets, sheetsByGid],
  );

  const getChildSheets = useCallback(
    (childGids) =>
      (childGids || [])
        .map((gid) => getSheetByGid(String(gid)))
        .filter(Boolean),
    [getSheetByGid],
  );

  return {
    sheets: rootSheets,
    rootSheets,
    allSheets,
    sheetsByGid,
    loading,
    error,
    reload: load,
    getSheetByGid,
    getChildSheets,
  };
};

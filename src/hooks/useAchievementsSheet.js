import { useCallback, useEffect, useState } from 'react';
import { fetchAchievementsByGid } from '../api/fetchAchievementsByGid';

export function useAchievementsSheet(gid) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!gid) {
      setAchievements([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchAchievementsByGid(gid);
      setAchievements(data);
    } catch (err) {
      setAchievements([]);
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, [gid]);

  useEffect(() => {
    load();
  }, [load, gid]);

  return { achievements, loading, error, reload: load };
}

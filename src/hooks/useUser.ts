import { useEffect, useState } from 'react';
import type { User } from '../types/user';
import { getUser } from '../services/userService';

export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const data = await getUser(id, controller.signal);
        setUser(data);
        setLoading(false);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [id, attempt]);

  function reload() {
    setLoading(true);
    setError(null);
    setAttempt((a) => a + 1);
  }

  return { user, loading, error, reload };
}
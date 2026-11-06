import { useEffect, useState } from 'react';
import type { User } from '../types/user';
import { getUsers } from '../services/userService';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const data = await getUsers(controller.signal);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [attempt]);

  function reload() {
    setLoading(true);
    setError(null);
    setAttempt((a) => a + 1);
  }

  return { users, loading, error, reload };
}
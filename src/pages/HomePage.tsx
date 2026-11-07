import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import type { User } from '../types/user';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import UserModal from '../components/UserModal';

export default function HomePage() {
  const { users, loading, error, reload } = useUsers();
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const filteredUsers = useMemo(() => {
    const keyword = deferredQuery.trim().toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword),
    );
  }, [users, deferredQuery]);

  const handleClose = useCallback(() => setSelectedUser(null), []);

  const showContent = !loading && !error;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SearchBar value={query} onChange={setQuery} />

        {showContent && (
          <p className="text-base text-slate-700">
            Menampilkan{' '}
            <span className="font-bold text-blue-700">
              {filteredUsers.length}
            </span>{' '}
            dari <span className="font-bold text-blue-700">{users.length}</span>{' '}
            pengguna
          </p>
        )}
      </div>

      {loading && <Spinner />}

      {error && (
        <div className="mt-8">
          <ErrorMessage message={error} onRetry={reload} />
        </div>
      )}

      {showContent && filteredUsers.length === 0 && (
        <p className="mt-10 text-center text-slate-600">
          Tidak ada pengguna yang cocok dengan "{deferredQuery}".
        </p>
      )}

      {showContent && filteredUsers.length > 0 && (
        <div
          className={`mt-6 grid gap-x-6 gap-y-8 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${isStale ? 'opacity-60' : 'opacity-100'
            }`}
        >
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onSelect={setSelectedUser} />
          ))}
        </div>
      )}

      {selectedUser && <UserModal user={selectedUser} onClose={handleClose} />}
    </>
  );
}
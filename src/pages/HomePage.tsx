import { useDeferredValue, useMemo } from 'react';
import { useUsers } from '../hooks/useUsers';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 6;

interface HomePageProps {
  query: string;
  page: number;
  onPageChange: (page: number) => void;
}

export default function HomePage({
  query,
  page,
  onPageChange,
}: HomePageProps) {
  const { users, loading, error, reload } = useUsers();

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

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const visibleUsers = filteredUsers.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE,
  );

  const showContent = !loading && !error;

  return (
    <>
      {showContent && (
        <p className="text-base font-medium text-slate-800">
          Menampilkan {visibleUsers.length} dari {filteredUsers.length} pengguna
        </p>
      )}

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
        <>
          <div
            className={`mt-4 grid gap-6 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${isStale ? 'opacity-60' : 'opacity-100'
              }`}
          >
            {visibleUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={onPageChange}
          />
        </>
      )}
    </>
  );
}
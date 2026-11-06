import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

interface NavbarProps {
  query: string;
  onSearch: (value: string) => void;
}

export default function Navbar({ query, onSearch }: NavbarProps) {
  const { pathname } = useLocation();
  const isDetail = pathname.startsWith('/users/');
  const title = isDetail ? 'Detail Pengguna' : 'Daftar Pengguna';

  return (
    <header className="border-b border-white/60 bg-white/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-semibold tracking-wider text-slate-900 sm:text-2xl">
          {title}
        </h1>

        {!isDetail && <SearchBar value={query} onChange={onSearch} />}
      </div>
    </header>
  );
}
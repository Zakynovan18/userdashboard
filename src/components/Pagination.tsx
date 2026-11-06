import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const arrowClass = [
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
  'border border-white/70 bg-white/40 text-slate-800 shadow-md backdrop-blur-md',
  'transition hover:bg-white/70',
  'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/40',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
].join(' ');

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Navigasi halaman"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        aria-label="Halaman sebelumnya"
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
        className={arrowClass}
      >
        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
      </button>

      <ul className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              type="button"
              aria-label={`Halaman ${i + 1}`}
              aria-current={i === page ? 'page' : undefined}
              onClick={() => onChange(i)}
              className={`block h-2.5 rounded-full transition-all ${i === page
                  ? 'w-8 bg-slate-800'
                  : 'w-2.5 bg-slate-800/25 hover:bg-slate-800/50'
                }`}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label="Halaman berikutnya"
        disabled={page === totalPages - 1}
        onClick={() => onChange(page + 1)}
        className={arrowClass}
      >
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>
    </nav>
  );
}
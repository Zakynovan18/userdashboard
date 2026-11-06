interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const inputClass = [
  'w-full rounded-xl border-gray-300 bg-white py-3 pl-5 pr-12',
  'text-slate-900 shadow-lg outline-none',
  'transition-all focus:border-2',
  'sm:w-56 sm:focus:w-64',
  '[&::-webkit-search-cancel-button]:appearance-none',
].join(' ');

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-fit">
      <label htmlFor="search" className="sr-only">
        Cari pengguna berdasarkan nama atau email
      </label>
      <input
        id="search"
        name="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari pengguna..."
        className={inputClass}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="pointer-events-none absolute right-3 top-1/2 size-6 -translate-y-1/2 text-gray-500"
      >
        <path
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
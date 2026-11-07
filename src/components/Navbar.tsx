const barClass = [
  'mx-auto flex max-w-6xl items-center px-4 py-4',
  'rounded-2xl border border-white/70 bg-white/50 shadow-lg backdrop-blur-xl',
].join(' ');

export default function Navbar() {
  return (
    <header className="px-6 pt-4">
      <div className={barClass}>
        <h1 className="text-3xl font-bold tracking-wider text-slate-900 sm:text-2xl">
          Daftar Pengguna
        </h1>
      </div>
    </header>
  );
}
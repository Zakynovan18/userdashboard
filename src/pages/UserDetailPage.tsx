import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import type { User } from '../types/user';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Avatar from '../components/Avatar';

const cardClass = [
  'p-6',
  'rounded-3xl border-2 border-slate-200 bg-white shadow-md',
].join(' ');

const backButtonClass = [
  'inline-block rounded-full border border-slate-300 bg-white px-6 py-2',
  'text-sm font-medium text-slate-900',
  'transition hover:border-slate-900 hover:bg-slate-900 hover:text-white',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
].join(' ');

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h3 className="text-lg font-bold uppercase tracking-wider text-back">
        {title}
      </h3>
      <dl className="mt-2 space-y-2">{children}</dl>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
}

function Field({ label, value }: FieldProps) {
  return (
    <div>
      <dt className="text-sm font-bold uppercase tracking-wider text-slate-400">
        {label}
      </dt>
      <dd className="break-words text-base font-medium leading-snug text-slate-900">
        {value}
      </dd>
    </div>
  );
}

function UserDetailCard({ user }: { user: User }) {
  const { name, username, email, phone, website, address, company } = user;

  return (
    <article className={cardClass}>
      <header className="flex items-center gap-4">
        <div className="shrink-0 rounded-full shadow-md">
          <Avatar name={name} size="xl" />
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-3xl font-bold text-slate-900">{name}</h2>
          <p className="truncate text-base font-medium text-blue-600">
            @{username}
          </p>
        </div>
      </header>

      <hr className="my-4 border-slate-200" />

      <div className="space-y-4">
        <Section title="Kontak">
          <Field label="Email" value={email} />
          <Field label="Telepon" value={phone} />
          <Field label="Website" value={website} />
        </Section>

        <Section title="Alamat">
          <Field label="Jalan" value={`${address.street}, ${address.suite}`} />
          <Field label="Kota" value={`${address.city} ${address.zipcode}`} />
          <Field
            label="Koordinat"
            value={`${address.geo.lat}, ${address.geo.lng}`}
          />
        </Section>

        <Section title="Perusahaan">
          <Field label="Nama" value={company.name} />
          <Field label="Slogan" value={company.catchPhrase} />
          <Field label="Bidang" value={company.bs} />
        </Section>
      </div>
    </article>
  );
}

export default function UserDetailPage() {
  const { id = '' } = useParams();
  const { user, loading, error, reload } = useUser(id);

  return (
    <div className="mx-auto max-w-2xl">
      {loading && <Spinner />}

      {error && (
        <div className="mt-8">
          <ErrorMessage message={error} onRetry={reload} />
        </div>
      )}

      {user && <UserDetailCard user={user} />}

      <div className="mt-4">
        <Link to="/" className={backButtonClass}>
          Kembali ke daftar
        </Link>
      </div>
    </div>
  );
}
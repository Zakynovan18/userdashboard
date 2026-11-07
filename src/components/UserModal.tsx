import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import type { User } from '../types/user';
import Avatar from './Avatar';

const panelClass = [
  'relative max-h-full w-full max-w-2xl overflow-y-auto p-6',
  'rounded-3xl border-2 border-slate-200 bg-white shadow-2xl',
].join(' ');

const closeClass = [
  'absolute right-4 top-4 rounded-full p-2 text-slate-500',
  'transition hover:bg-slate-900 hover:text-white',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
].join(' ');

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h3 className="text-lg font-bold uppercase tracking-wider text-blue-600">
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
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </dt>
      <dd className="break-words text-base font-medium leading-snug text-slate-900">
        {value}
      </dd>
    </div>
  );
}

interface UserModalProps {
  user: User;
  onClose: () => void;
}

export default function UserModal({ user, onClose }: UserModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { name, username, email, phone, website, address, company } = user;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-modal-title"
        className={panelClass}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className={closeClass}
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        <header className="flex items-center gap-4 pr-10">
          <div className="shrink-0 rounded-full shadow-md">
            <Avatar name={name} size="xl" />
          </div>
          <div className="min-w-0">
            <h2
              id="user-modal-title"
              className="truncate text-3xl font-bold text-slate-900"
            >
              {name}
            </h2>
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
      </div>
    </div>
  );
}
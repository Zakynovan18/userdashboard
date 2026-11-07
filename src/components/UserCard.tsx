import { memo } from 'react';
import type { User } from '../types/user';
import Avatar from './Avatar';

const cardClass = [
  'group relative flex flex-col items-center gap-4 p-5 text-center',
  'rounded-3xl border-2 border-slate-200 bg-white shadow-md',
  'transition duration-300 ease-out',
  'hover:z-10 hover:-translate-y-2 hover:scale-105 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-300/40',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
].join(' ');

const pillClass = [
  'mt-auto rounded-full border border-slate-300 bg-white px-5 py-1.5',
  'text-sm font-medium text-slate-900',
  'transition group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white',
].join(' ');

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const { name, username, email, phone, address, company } = user;

  const details = [
    { label: 'Perusahaan', value: company.name },
    { label: 'Email', value: email },
    { label: 'Telepon', value: phone },
    { label: 'Kota', value: address.city },
  ];

  return (
    <button type="button" onClick={() => onSelect(user)} className={cardClass}>
      <div className="rounded-full shadow-md">
        <Avatar name={name} size="lg" />
      </div>

      <div className="w-full min-w-0">
        <h2 className="truncate text-lg font-bold text-slate-900 transition group-hover:text-blue-600">
          {name}
        </h2>
        <p className="truncate text-sm font-medium text-blue-600">
          @{username}
        </p>
      </div>

      <dl className="w-full space-y-2">
        {details.map(({ label, value }) => (
          <div key={label} className="min-w-0">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {label}
            </dt>
            <dd
              className="truncate text-sm font-medium text-slate-800"
              title={value}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <span className={pillClass}>Lihat detail</span>
    </button>
  );
}

export default memo(UserCard);
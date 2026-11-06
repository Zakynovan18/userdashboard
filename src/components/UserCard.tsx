import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types/user';
import Avatar from './Avatar';

const cardClass = [
  'group relative flex flex-col items-center gap-4 p-6 text-center',
  'rounded-3xl border-2 border-white/70 bg-linear-to-b from-white/60 to-white/25',
  'shadow-lg backdrop-blur-xl',
  'transition duration-300 ease-out',
  'hover:z-10 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-blue-300/40',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
].join(' ');

const pillClass = [
  'mt-auto rounded-full border border-slate-300 bg-white px-6 py-2',
  'text-sm font-medium text-slate-900',
  'transition group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white',
].join(' ');

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  const { id, name, username, email, phone, company } = user;
  const details = [company.name, email, phone];

  return (
    <Link to={`/users/${id}`} className={cardClass}>
      <div className="rounded-full shadow-md ring-4 ring-white">
        <Avatar name={name} size="xl" />
      </div>

      <div className="w-full min-w-0">
        <h2 className="truncate text-xl font-bold text-slate-900">{name}</h2>
        <p className="truncate text-sm text-slate-600">@{username}</p>
      </div>

      <div className="w-full min-w-0 space-y-1 text-sm text-slate-700">
        {details.map((text) => (
          <p key={text} className="truncate" title={text}>
            {text}
          </p>
        ))}
      </div>

      <span className={pillClass}>Lihat detail</span>
    </Link>
  );
}

export default memo(UserCard);
import type { User } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Gagal memuat data (status ${response.status})`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Format data dari server tidak sesuai');
  }

  return data as User[];
}
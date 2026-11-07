Single Page Application (SPA untuk mencari daftar pengguna dengan menggunakan API URL dari ) [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)

**Deploy:** <https://userdashboard-sable.vercel.app/>

## Tech Stack
React, TypeScript, Vite, Tailwind CSS v4, Lucide React, Fontsource (Krub)

## Pemahaman 
### 1. State Management & Lifecycle
Untuk fetching datanya diambil dalam custom hook useUsers memakai useEffect, kemudian hook memanggil getUsers di Services/userService.ts. Hook menyimpan empat state: users, loading (awalnya true), error, dan attempt. 
 Untuk mencegah
infinite loop, dependency array saya `[attempt]`: effect hanya berjalan saat
komponen pertama kali muncul dan saat tombol "Coba lagi" menaikkan `attempt`,
bukan dari dalam effect itu sendiri. Untuk mencegah memory leak dan race
condition, effect membuat `AbortController` dan fungsi cleanup memanggil
`abort()`, sehingga request yang masih berjalan dibatalkan saat komponen hilang
atau effect berjalan ulang.

### 2. Struktur Folder
```
src/
  components/   
  hooks/        
  services/     
  types/        
  pages/        
```
Saya menggunakan pemisahan kode berdasarkan tanggungjawab masing - masing. Di folder `components` untuk tampilan, `hooks` untuk logic state dan fetching, `services` untuk intrgrasi dengan API, `types` untuk membentuk data, dan `pages` untuk halaman yang membuat rangkain semuanya. Pemisahan ini membuat tiap bagian mudah dipahami, diganti,
dan diuji sendiri. Untuk aplikasi sekecil/sederhana seperti ini struktur berdasarkan jenis file harusnya sudah cukup, dan jika fitur bertambah saya akan
pindahkan ke struktur per fitur. 

### 3. Optimasi Kinerja
Pada saat saya coba simulasi 10000 data, saya tes dengan coba mengetik dan kemudian menghapus per huruf di search bar kerasa sedikit berat karena per ketikan merender ulang kartu sebanyak itu. Jadi opsi nya saya memakai `useDeferredValue` pada kata kunci. sehingga input tetap responsif sementara daftar menyusul dengan prioritas lebih
rendah. Hasil penyaringan dibungkus `useMemo` agar tidak dihitung ulang kecuali data atau kata kunci berubah, dan `UserCard` dibungkus `React.memo` agar cuma
merender ulang saat props nya berubah. `memo` efektif karena `onSelect`nadalah setter state yang identitasnya stabil.
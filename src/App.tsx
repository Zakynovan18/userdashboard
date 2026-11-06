import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UserDetailPage from './pages/UserDetailPage';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);

  function handleSearch(value: string) {
    setQuery(value);
    setPage(0);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-200 via-violet-200 to-pink-200">
      <Navbar query={query} onSearch={handleSearch} />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage query={query} page={page} onPageChange={setPage} />
            }
          />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
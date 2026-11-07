import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br  from-sky-200 via-violet-200 to-pink-200">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
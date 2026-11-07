import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/krub/400.css';
import '@fontsource/krub/500.css';
import '@fontsource/krub/600.css';
import '@fontsource/krub/700.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
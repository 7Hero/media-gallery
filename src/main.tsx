import App from './app.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MediaGrid } from './components/media-grid.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Navigate to="/folder/your-folder" replace />} />
          <Route path="folder/:folderId" element={<MediaGrid />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

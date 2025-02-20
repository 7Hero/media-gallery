import App from './app.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MediaGrid } from './components/media-grid.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';

import './index.css';
import { DefaultRoute } from './components/default-route.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<DefaultRoute />} />
          <Route path="folder/:folderId" element={<MediaGrid />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

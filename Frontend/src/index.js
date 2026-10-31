import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ React 18+ syntax
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext.js';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const container = document.getElementById('root');
const root = createRoot(container); // ✅ createRoot instead of render

root.render(
  <BrowserRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>
);

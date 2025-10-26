import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import {BrowserRouter, BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </StrictMode>
);

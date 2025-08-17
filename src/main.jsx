// /src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // ← NECESARIO para el collapse
import './assets/styles/theme.css';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { Toaster } from './components/Toaster.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Toaster>
          <App />
        </Toaster>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

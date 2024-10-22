import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import SignIn from './pages/login'; 
import { AuthProvider } from './authcontext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/*" element={<App />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
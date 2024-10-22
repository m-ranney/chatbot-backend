import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './authcontext';
import { SisenseContextProvider, ThemeProvider } from '@sisense/sdk-ui';
import { AiContextProvider } from '@sisense/sdk-ui/ai';
import SignIn from './pages/login';
import ChatbotComponent from './pages/chatbotComponent';


const App = () => {
  const { token } = useAuth();

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <SisenseContextProvider url={"https://sisenseurl.com"} token={token}>
      <AiContextProvider>
        <Routes>
          <Route path="/chatbot" element={<ChatbotComponent />} />
          <Route path="*" element={<Navigate to="/chatbot" />} />
        </Routes>
      </AiContextProvider>
    </SisenseContextProvider>
  );
};

export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './authcontext';
import { SisenseContextProvider, ThemeProvider } from '@sisense/sdk-ui';
import { AiContextProvider } from '@sisense/sdk-ui/ai';
import ChatbotComponent from './pages/chatbotComponent';

const App = () => {
  const { token } = useAuth();

  // Skip login redirect if the token is set for bypass
  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<div>Login Page (Not Used for Testing)</div>} />
        <Route path="*" element={<Navigate to="/chatbot" />} />
      </Routes>
    );
  }

  return (
    <SisenseContextProvider url={"https://sapienceai.openai.azure.com/"} token={"test-token-for-testing-purposes"}>
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

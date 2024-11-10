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
    <SisenseContextProvider url={"https://sapiencebi-dev-us-ai-poc-azure.sapienceanalytics.com/"} token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZmZjlkOGFlNGY2ZGQwMDFjZDk2MjJlIiwiYXBpU2VjcmV0IjoiZGY4YzdhZDYtNzZiNS1lOGY2LTllNjAtZTIyY2YwN2VjOTliIiwiYWxsb3dlZFRlbmFudHMiOlsiNjZmZjlkOGJlNGY2ZGQwMDFjZDk2MjNiIl0sInRlbmFudElkIjoiNjZmZjlkOGJlNGY2ZGQwMDFjZDk2MjNiIiwiZXhwIjoxNzMxODgzNDQzfQ.-XxgUw4Wi_1cXj_YvGe8BqQnhI_dMW2c6ySuFiZ9egs"}>
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

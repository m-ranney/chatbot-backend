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
    <SisenseContextProvider url={"https://sapienceai.openai.azure.com/"} token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjY4NjkzYmMwNzc2MTcwMDFkNWMyNWQxIiwiYXBpU2VjcmV0IjoiMzUxMTMtMzk4NC0wQjE5LTI5NkItOTQxOC00NDg0LTlBRTktMUFCRC01IiwiYWxsb3dlZFRlbmFudHMiOlsiNjY4NjkzYmMwNzc2MTcwMDFkNWMyNWRlIl0sInRlbmFudElkIjoiNjY4NjkzYmMwNzc2MTcwMDFkNWMyNWRlIiwiZXhwIjoxNzMwNDc4Njc3fQ.RuorXafaIU9Pn6UDEZDAPzvKPWw9Vzi28Nr123XRSb0"}>
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

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
    <SisenseContextProvider url={"https://sapienceai.openai.azure.com/"} token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZmZjlkOGFlNGY2ZGQwMDFjZDk2MjJlIiwiYXBpU2VjcmV0IjoiZGY4YzdhZDYtNzZiNS1lOGY2LTllNjAtZTIyY2YwN2VjOTliIiwiYWxsb3dlZFRlbmFudHMiOlsiNjZmZjlkOGJlNGY2ZGQwMDFjZDk2MjNiIl0sInRlbmFudElkIjoiNjZmZjlkOGJlNGY2ZGQwMDFjZDk2MjNiIiwiZXhwIjoxNzMxODc2MTIzfQ.oh3HYLKfEuWgRVWVRWOy1at8TRSQvqSnTn2EGEXd7UI"}>
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

// Solution to bypass login and go directly to the chatbot component for testing purposes

// Step 1: Modify `authcontext.tsx` to directly set a default token without requiring login
// Add a default token to simplify the bypass of the login flow
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  token: string | null;
  sisenseUrl: string | null;
  setToken: (token: string | null) => void;
  setSisenseUrl: (url: string | null) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Set default token to bypass login
  const [token, setToken] = useState<string | null>('bypassed-token');
  const [sisenseUrl, setSisenseUrl] = useState<string | null>(
    process.env.REACT_APP_SISENSE_URL || null
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      if (location.pathname === '/login') {
        navigate('/chatbot');
      }
    } else if (location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, location.pathname, token]);

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      setToken(newToken);
    } else {
      setToken(null);
    }
  };

  const handleSetSisenseUrl = (newUrl: string | null) => {
    if (newUrl) {
      setSisenseUrl(newUrl);
    } else {
      setSisenseUrl(process.env.REACT_APP_SISENSE_URL || null);
    }
  };

  const logout = () => {
    setToken(null);
    setSisenseUrl(process.env.REACT_APP_SISENSE_URL || null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, sisenseUrl, setToken: handleSetToken, setSisenseUrl: handleSetSisenseUrl, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
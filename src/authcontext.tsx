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

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [sisenseUrl, setSisenseUrl] = useState<string | null>(
      process.env.REACT_APP_SISENSE_URL || null
    );
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      const sessionToken = getCookie('sisenseToken') || localStorage.getItem('sisenseToken');
      const storedSisenseUrl = localStorage.getItem('sisenseUrl') || sisenseUrl;
  
      if (sessionToken && storedSisenseUrl) {
        setToken(sessionToken);
        setSisenseUrl(storedSisenseUrl);
  
        if (location.pathname === '/login') {
          navigate('/chatbot');
        }
      } else if (location.pathname !== '/login') {
        navigate('/login'); 
      }
    }, [navigate, location.pathname, sisenseUrl]);
  
    const handleSetToken = (newToken: string | null) => {
      if (newToken) {
        setToken(newToken);
        document.cookie = `sisenseToken=${encodeURIComponent(newToken)}; path=/;`;
        localStorage.setItem('sisenseToken', newToken);
      } else {
        setToken(null);
        removeCookie('sisenseToken');
        localStorage.removeItem('sisenseToken');
      }
    };
  
    const handleSetSisenseUrl = (newUrl: string | null) => {
      if (newUrl) {
        setSisenseUrl(newUrl);
        localStorage.setItem('sisenseUrl', newUrl);
      } else {
        setSisenseUrl(process.env.REACT_APP_SISENSE_URL || null);
        localStorage.removeItem('sisenseUrl');
      }
    };
  
    const logout = () => {
      setToken(null);
      setSisenseUrl(process.env.REACT_APP_SISENSE_URL || null);
      removeCookie('sisenseToken');
      localStorage.removeItem('sisenseToken');
      localStorage.removeItem('sisenseUrl');
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

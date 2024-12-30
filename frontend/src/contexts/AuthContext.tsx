import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
  loggedIn: boolean;
  userId: string | null;
  setLoggedIn: (status: boolean, userId?: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedInState] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Lấy trạng thái từ localStorage khi ứng dụng load lại
    const savedLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const savedUserId = localStorage.getItem('userId');
    setLoggedInState(savedLoggedIn);
    setUserId(savedUserId);
  }, []);

  const setLoggedIn = (status: boolean, userId?: string | null) => {
    setLoggedInState(status);
    setUserId(userId || null);
    localStorage.setItem('loggedIn', String(status));
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, userId, setLoggedIn, logout }}>
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

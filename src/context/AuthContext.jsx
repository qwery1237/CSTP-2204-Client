/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserData } from '../api/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const setUserData = async (token) => {
    if (!token) {
      localStorage.removeItem('user');
      setUser();
      return;
    }
    const userData = await getUserData(token, setUser);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  return (
    <AuthContext.Provider value={{ user, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

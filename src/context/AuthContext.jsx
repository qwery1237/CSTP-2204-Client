/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserData } from '../api/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  const updateUserData = async (userToken) => {
    if (!userToken) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken();
      setUser();
      return;
    }
    localStorage.setItem('token', JSON.stringify(userToken));
    const crrUser = await getUserData(userToken, setUser);
    localStorage.setItem('user', JSON.stringify(crrUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

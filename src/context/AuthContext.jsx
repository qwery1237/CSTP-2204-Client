/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserData } from '../api/user';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  const updateUserData = async (userToken) => {
    if (!userToken) {
      localStorage.removeItem('token');

      setToken();
      setUser();

      return;
    }
    const crrUser = await getUserData(userToken);

    setToken(userToken);
    setUser(crrUser);

    localStorage.setItem('token', JSON.stringify(userToken));
  };
  useEffect(() => {
    if (!user) {
      if (localStorage.getItem('token')) {
        const tk = JSON.parse(localStorage.getItem('token'));
        updateUserData(tk);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

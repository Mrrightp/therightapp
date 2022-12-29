import React, { createContext, useState, useEffect } from 'react';
import { hasCookie, getCookie } from 'cookies-next';
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const login = async () => {
      if (hasCookie('uf-login-data')) {
        const cookie = getCookie('uf-login-data');
        const userData = JSON.parse(cookie);
        const data = {
          userId: userData.userId,
        };
        const res = await axios.post('/api/profile/getprofileinfo', data);
        setAuth(res.data.getUserInfo);
      }
    };
    login();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

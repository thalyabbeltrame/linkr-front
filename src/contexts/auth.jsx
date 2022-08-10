import { createContext, useContext, useState, useEffect } from 'react';

import { api } from '../services/api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('LinkrAuthUser');
    const storagedToken = localStorage.getItem('LinkrAuthToken');

    if (storagedUser && storagedToken) {
      //send token if user is authenticated!
      api.defaults.headers['Authorization'] = storagedToken;
      setUserData(JSON.parse(storagedUser));
    }
  }, []);

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('LinkrAuthUser');
    localStorage.removeItem('LinkrAuthToken');
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!userData,
        userData,
        setUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

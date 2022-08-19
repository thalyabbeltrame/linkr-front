import { createContext, useContext, useEffect, useState } from 'react';

import { alert } from '../Helpers/alert';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('LinkrAuthUser');
    const storagedToken = localStorage.getItem('LinkrAuthToken');

    if (storagedUser && storagedToken) {
      api.defaults.headers['Authorization'] = storagedToken;
      setUserData(JSON.parse(storagedUser));
    }
  }, []);

  const logout = (sessionExpired = true) => {
    if (sessionExpired) {
      alert('error', 'Your session expired', 'Log in again!');
    }
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

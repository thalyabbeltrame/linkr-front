import { createContext, useContext, useState } from 'react';

const Trending = createContext();

export const TrendingProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);
  const [updateTrending, setUpdateTrending] = useState(false);

  return (
    <Trending.Provider
      value={{ trending, updateTrending, setUpdateTrending, setTrending }}
    >
      {children}
    </Trending.Provider>
  );
};

export const useTrending = () => {
  const context = useContext(Trending);
  return context;
};

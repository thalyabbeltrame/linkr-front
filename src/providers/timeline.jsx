import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext();

export const TimelineProvider = ({ children }) => {
  const [dataPosts, setDataPosts] = useState([]);
  const [hasUpdate, setHasUpdate] = useState(false);

  return (
    <TimelineContext.Provider
      value={{ dataPosts, setDataPosts, hasUpdate, setHasUpdate }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  return context;
};

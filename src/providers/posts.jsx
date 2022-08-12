import { createContext, useContext, useState } from 'react';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [dataPosts, setDataPosts] = useState([]);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [user, setUser] = useState({});

  return (
    <PostsContext.Provider
      value={{ dataPosts, setDataPosts, hasUpdate, setHasUpdate, user, setUser }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  return context;
};

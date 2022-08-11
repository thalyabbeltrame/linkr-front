import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/auth';
import { PostsProvider } from './contexts/posts';
import { HandleRoute } from './routes/HandleRoutes';
import GlobalStyles from './shared/GlobalStyles';

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <AuthProvider>
          <PostsProvider>
            <HandleRoute />
          </PostsProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

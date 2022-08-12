import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './providers/auth';
import { PostsProvider } from './providers/posts';
import { HandleRoute } from './routes/HandleRoutes';
import GlobalStyles from './components/GlobalStyles';

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

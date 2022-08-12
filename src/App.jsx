import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './providers/auth';
import { PostsProvider } from './providers/posts';
import { TrendingProvider } from './providers/trendings';
import { HandleRoute } from './routes/HandleRoutes';
import GlobalStyles from './components/GlobalStyles';

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <AuthProvider>
          <TrendingProvider>
            <PostsProvider>
              <HandleRoute />
            </PostsProvider>
          </TrendingProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

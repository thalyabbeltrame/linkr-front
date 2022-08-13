import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './providers/AuthProvider';
import { PostsProvider } from './providers/PostsProvider';
import { TrendingProvider } from './providers/TrendingsProvider';
import { HandleRoute } from './routes/HandleRoutes';
import { GlobalStyles } from './styles/GlobalStyles';

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

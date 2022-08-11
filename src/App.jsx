
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './shared/GlobalStyles';
import { HandleRoute } from './routes/HandleRoutes';
import { AuthProvider } from './contexts/auth';


function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <AuthProvider>
          <HandleRoute />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

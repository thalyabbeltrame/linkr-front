import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './providers/auth';
import { TimelineProvider } from './providers/timeline';
import { HandleRoute } from './routes/HandleRoutes';
import GlobalStyles from './components/GlobalStyles';

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <AuthProvider>
          <TimelineProvider>
            <HandleRoute />
          </TimelineProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

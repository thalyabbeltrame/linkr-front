import { BrowserRouter } from 'react-router-dom'
import GlobalStyles from './shared/GlobalStyles'
import { PublicRoutes } from './routes/PublicRoutes'
function App() {


  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <PublicRoutes />
      </BrowserRouter>
    </>
  )
}

export default App

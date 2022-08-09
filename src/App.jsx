import { BrowserRouter } from 'react-router-dom'
import GlobalStyles from './shared/GlobalStyles'
import { PublicRoutes } from './routes/PublicRoutes'
import Header from './shared/components/Header'
function App() {


  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <GlobalStyles />
        <PublicRoutes />
      </BrowserRouter>
    </>

  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import { SignIn } from '../pages/SignIn'

export const PublicRoutes = () => (
    <Routes>
        <Route path='/' element={ <SignIn /> }/>
    </Routes>
)
import { Routes, Route } from 'react-router-dom'
import { SignIn } from '../pages/SignIn'
import { TimeLine } from '../pages/TimeLine'

export const PublicRoutes = () => (
    <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/timeline' element={<TimeLine />} />
    </Routes>
)
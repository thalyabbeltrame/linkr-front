import { Routes, Route } from 'react-router-dom'
import { SignIn } from '../pages/signIn/SignIn'
import { SignUp } from '../pages/signUp/SignUp'
import { TimeLine } from '../pages/timeLine/TimeLine'

export const PublicRoutes = () => (
    <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/timeline' element={<TimeLine />} />
        <Route path='/sign-up' element={ <SignUp /> }/>
    </Routes>
)
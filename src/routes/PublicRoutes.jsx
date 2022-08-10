import { Navigate, Route, Routes } from 'react-router-dom';

import { SignIn } from '../pages/signIn/SignIn';
import { SignUp } from '../pages/signUp/SignUp';

export const PublicRoutes = () => (
  <Routes>
    <Route path='/' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='*' element={<Navigate to='/' replace />} />
  </Routes>
);

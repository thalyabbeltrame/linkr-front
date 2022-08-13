import { Navigate, Route, Routes } from 'react-router-dom';

import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';

export const PublicRoutes = () => (
  <Routes>
    <Route path='/' element={<SignInPage />} />
    <Route path='/sign-up' element={<SignUpPage />} />
    <Route path='*' element={<Navigate to='/' replace />} />
  </Routes>
);

import { Navigate, Route, Routes } from 'react-router-dom';

import { TimeLine } from '../pages/timeLine/TimeLine';
import { UserPage } from '../pages/userPage/UserPage';

export const PrivateRoutes = () => (
  <Routes>
    <Route path='/timeline' element={<TimeLine />} />
    <Route path='/user/:id' element={<UserPage />} />
    <Route path='*' element={<Navigate to='/timeline' replace />} />
  </Routes>
);

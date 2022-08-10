import { Navigate, Route, Routes } from 'react-router-dom';

import { TimeLine } from '../pages/timeLine/TimeLine';

export const PrivateRoutes = () => (
  <Routes>
    <Route path='/timeline' element={<TimeLine />} />
    <Route path='*' element={<Navigate to='/timeline' replace />} />
  </Routes>
);

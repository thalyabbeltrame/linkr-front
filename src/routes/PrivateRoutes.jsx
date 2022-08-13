import { Navigate, Route, Routes } from 'react-router-dom';

import { HashtagPage } from '../pages/hashtagPage/HashtagPage';
import { TimeLine } from '../pages/timeLine/TimeLine';
import { UserPage } from '../pages/userPage/UserPage';

export const PrivateRoutes = () => (
  <Routes>
    <Route path='/timeline' element={<TimeLine />} />
    <Route path='/user/:id' element={<UserPage />} />
    <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
    <Route path='*' element={<Navigate to='/timeline' replace />} />
  </Routes>
);

import { Navigate, Route, Routes } from 'react-router-dom';

import { HashtagPage } from '../pages/HashtagPage';
import { TimelinePage } from '../pages/TimelinePage';
import { UserPage } from '../pages/UserPage';

export const PrivateRoutes = () => (
  <Routes>
    <Route path='/timeline' element={<TimelinePage />} />
    <Route path='/user/:id' element={<UserPage />} />
    <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
    <Route path='*' element={<Navigate to='/timeline' replace />} />
  </Routes>
);

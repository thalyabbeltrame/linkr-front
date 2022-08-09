import { Routes, Route, Navigate } from 'react-router-dom'
import { TimeLine } from '../pages/TimeLine'

export const PrivateRoutes = () => (
    <Routes>
        <Route path='/timeline' element={<TimeLine />} />
        <Route path='*' element={<Navigate to='/timeline' replace />} />
    </Routes>
)
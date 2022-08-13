import { useAuth } from '../providers/AuthProvider';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const HandleRoute = () => {
  const { signed } = useAuth();
  return signed ? <PrivateRoutes /> : <PublicRoutes />;
};

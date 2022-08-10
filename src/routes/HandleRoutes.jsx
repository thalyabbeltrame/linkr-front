import { useAuth } from '../contexts/auth';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const HandleRoute = () => {
  const { signed } = useAuth();
  return signed ? <PrivateRoutes /> : <PublicRoutes />;
};

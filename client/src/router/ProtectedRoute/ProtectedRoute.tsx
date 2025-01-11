import { Navigate, Outlet } from 'react-router';

import { SocketProvider } from '@context';
import { selectUser, useAppSelector } from '@reduxtoolkit';

const ProtectedRoute = () => {
  const user = useAppSelector(selectUser);

  return user ? (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  ) : (
    <Navigate to={'/auth?login'} />
  );
};
export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router';

import { SocketProvider } from '@context';
import { selectUser, useAppSelector } from '@reduxtoolkit';

export default function ProtectedRoute() {
  const user = useAppSelector(selectUser);

  if (!user) return <Navigate to={'auth'} />;

  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
}

import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { SocketProvider } from '@context';
import { selectUser, useAppSelector } from '@reduxtoolkit';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) navigate('auth?login');
  });

  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
}

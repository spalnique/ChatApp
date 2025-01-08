import { Navigate, Outlet } from 'react-router';
import type { FC } from 'react';

import { selectUser, useAppSelector } from '@reduxtoolkit';

const ProtectedRoute: FC = () => {
  const user = useAppSelector(selectUser);

  return user ? <Outlet /> : <Navigate to={'/auth?login'} />;
};
export default ProtectedRoute;

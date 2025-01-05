import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

import { selectUser, useAppSelector } from '../@redux';

const ProtectedRoute: FC = () => {
  const user = useAppSelector(selectUser);

  return user ? <Outlet /> : <Navigate to={'/auth?login'} />;
};
export default ProtectedRoute;

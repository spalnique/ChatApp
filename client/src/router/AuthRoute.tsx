import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useAppSelector, selectUser } from '../@redux';

const AuthRoute: FC = () => {
  const user = useAppSelector(selectUser);

  return user ? <Navigate to={'/main'} /> : <Outlet />;
};
export default AuthRoute;

import { Navigate, Outlet } from 'react-router';
import type { FC } from 'react';

import { selectUser, useAppSelector } from '@reduxtoolkit';

const AuthRoute: FC = () => {
  const user = useAppSelector(selectUser);

  return user ? <Navigate to={'/main'} /> : <Outlet />;
};
export default AuthRoute;

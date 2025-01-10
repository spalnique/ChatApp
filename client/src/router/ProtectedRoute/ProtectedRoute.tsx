import { Navigate, Outlet } from 'react-router';

import { selectUser, useAppSelector } from '@reduxtoolkit';

const ProtectedRoute = () => {
  const user = useAppSelector(selectUser);

  return user ? <Outlet /> : <Navigate to={'/auth?login'} />;
};
export default ProtectedRoute;

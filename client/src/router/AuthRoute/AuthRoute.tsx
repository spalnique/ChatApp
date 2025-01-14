import { Navigate, Outlet } from 'react-router';

import { selectUser, useAppSelector } from '@reduxtoolkit';

export default function AuthRoute() {
  const user = useAppSelector(selectUser);

  if (user) return <Navigate to={'/'} />;

  const knownUser = localStorage.getItem('user');

  return (
    <>
      <Navigate to={knownUser ? '?login' : '?register'} />
      <Outlet />
    </>
  );
}

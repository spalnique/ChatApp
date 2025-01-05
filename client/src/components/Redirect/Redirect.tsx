import type { FC } from 'react';
import { Navigate } from 'react-router';

import { useAppSelector, selectUser } from '../../@redux';

const Redirect: FC = () => {
  const user = useAppSelector(selectUser);

  return <Navigate to={user ? '/main' : '/auth?login'} replace />;
};
export default Redirect;

import { Navigate } from 'react-router';
import type { FC } from 'react';

import { selectUser, useAppSelector } from '../../redux';

const Redirect: FC = () => {
  const user = useAppSelector(selectUser);

  return <Navigate to={user ? '/main' : '/auth?login'} replace />;
};
export default Redirect;

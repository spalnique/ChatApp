import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { selectUser, useAppSelector } from '@reduxtoolkit';

export default function AuthRoute() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) navigate('main');
  });

  return <Outlet />;
}

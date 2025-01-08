import { Navigate, useSearchParams } from 'react-router';
import type { FC } from 'react';

import { AnimatedWrapper } from '@components';
import {
  authApi,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '@reduxtoolkit';

const MainPage: FC = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  if (searchParams.size) return <Navigate to="/main" />;

  return (
    <AnimatedWrapper animationKey={'mainPage'}>
      <h3>Main Page</h3>
      <p>Current user ID: {user!.username}</p>
      <button
        type="button"
        onClick={() => {
          dispatch(authApi.logout());
        }}
      >
        Logout
      </button>
    </AnimatedWrapper>
  );
};
export default MainPage;

import type { FC } from 'react';

import {
  authApi,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '../../@redux';

import { Navigate, useSearchParams } from 'react-router';

const MainPage: FC = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  if (searchParams.size) return <Navigate to="/main" />;

  return (
    <>
      <h3>Main Page</h3>

      <>
        <p>Current user ID: {user!.username}</p>
        <button
          type="button"
          onClick={() => {
            dispatch(authApi.logout());
          }}
        >
          Logout
        </button>
      </>
    </>
  );
};
export default MainPage;

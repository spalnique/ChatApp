import { Navigate, useSearchParams } from 'react-router';

import { AnimatedWrapper, ChatList } from '@components';
import {
  authApi,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '@reduxtoolkit';

import UserSearch from '../../components/Forms/UserSearch.tsx';

const MainPage = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  if (searchParams.size) return <Navigate to="/main" />;

  return (
    <AnimatedWrapper animationKey={'mainPage'}>
      <h3>Main Page</h3>
      <p>Current username: {user!.username}</p>
      <button
        type="button"
        onClick={() => {
          dispatch(authApi.logout());
        }}
      >
        Logout
      </button>
      <UserSearch />
      <ChatList />
    </AnimatedWrapper>
  );
};
export default MainPage;

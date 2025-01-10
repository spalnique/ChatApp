import { Navigate, useSearchParams } from 'react-router';

import { ActiveChat, AnimatedWrapper, Button, Sidebar } from '@components';
import {
  authApi,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '@reduxtoolkit';

const MainPage = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  if (searchParams.size) return <Navigate to="/main" />;

  return (
    <AnimatedWrapper animationKey={'mainPage'}>
      <header className="fixed flex h-[70px] w-full items-center border-slate-300 bg-slate-300 px-8">
        <span className="ml-auto mr-0 inline-block">
          Current username: {user!.username}
        </span>
        <Button
          type="button"
          label="Logout"
          className="!ml-auto !mr-0"
          onClick={() => {
            dispatch(authApi.logout());
          }}
        />
      </header>
      <main className="flex">
        <Sidebar />
        <ActiveChat />
      </main>
    </AnimatedWrapper>
  );
};
export default MainPage;

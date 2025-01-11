import { Navigate, useSearchParams } from 'react-router';

import { ActiveChat, AnimatedWrapper, Button, Sidebar } from '@components';
import { useSocketContext } from '@hooks';
import {
  authApi,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '@reduxtoolkit';

const MainPage = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const socket = useSocketContext();
  const user = useAppSelector(selectUser);

  if (searchParams.size) return <Navigate to="/main" />;

  return (
    <AnimatedWrapper animationKey={'mainPage'}>
      <header className="fixed flex h-[70px] w-full items-center border-slate-300 bg-slate-300 px-8">
        <span className="ml-auto mr-0 inline-block">
          Current username: {user!.username}
        </span>
        <Button
          className="!ml-auto !mr-0"
          type="button"
          label="Logout"
          $width={120}
          onClick={() => {
            socket?.disconnect();
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

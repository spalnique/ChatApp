import { ActiveChat, AnimatedWrapper, Button, Sidebar } from '@components';
import { useWebsockets } from '@hooks';
import {
  authApi,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '@reduxtoolkit';

export default function MainPage() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const ws = useWebsockets();

  function handleLogout() {
    ws.disconnect();
    dispatch(authApi.logout());
  }

  return (
    <AnimatedWrapper animationKey={'mainPage'}>
      <header className="fixed flex h-[70px] w-full items-center border-slate-300 bg-slate-300 px-8">
        <span className="ml-auto mr-0 inline-block">
          Current user: {user?.displayName ?? user?.username}
        </span>
        <Button
          className="!ml-auto !mr-0"
          type="button"
          label="Logout"
          $width={120}
          onClick={handleLogout}
        />
      </header>
      <main className="flex">
        <Sidebar />
        <ActiveChat />
      </main>
    </AnimatedWrapper>
  );
}

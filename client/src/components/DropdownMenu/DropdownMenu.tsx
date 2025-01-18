import { Button } from '@components';
import { useWebsockets } from '@hooks';
import { authApi, useAppDispatch } from '@reduxtoolkit';
import { HeaderMenuStyled } from '@styled';

const DropdownMenu = () => {
  const dispatch = useAppDispatch();

  const ws = useWebsockets();

  function handleLogout() {
    ws.disconnect();
    dispatch(authApi.logout());
  }

  return (
    <HeaderMenuStyled>
      <Button
        type="button"
        label="Logout"
        $width={120}
        onClick={handleLogout}
      />
    </HeaderMenuStyled>
  );
};

export default DropdownMenu;

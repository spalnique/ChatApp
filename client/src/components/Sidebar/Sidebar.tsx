import { AppControls, ChatList, UserSearch } from '@components';
import { SidebarStyled } from '@styled';

const Sidebar = () => {
  return (
    <SidebarStyled>
      <UserSearch />
      <ChatList />
      <AppControls />
    </SidebarStyled>
  );
};
export default Sidebar;

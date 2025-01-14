import { AppControls, ChatList, UserSearch } from '@components';
import { SidebarStyled } from '@styled';

export default function Sidebar() {
  return (
    <SidebarStyled>
      <UserSearch />
      <ChatList />
      <AppControls />
    </SidebarStyled>
  );
}

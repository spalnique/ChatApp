import { useEffect, useState } from 'react';

import { AppControls, ChatList, ContactList, Profile } from '@components';
import { Tab } from '@enums';
import {
  chatApi,
  selectAllChats,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '@reduxtoolkit';
import { SidebarStyled } from '@styled';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  console.log(user);
  const chats = useAppSelector(selectAllChats);
  const initialTab = chats.length ? Tab.chats : Tab.contacts;
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    dispatch(chatApi.getAll());
  }, [dispatch]);

  return (
    <SidebarStyled>
      {activeTab === Tab.chats && <ChatList chats={chats} />}
      {activeTab === Tab.contacts && <ContactList />}
      {activeTab === Tab.profile && <Profile />}
      <AppControls onTabSelect={setActiveTab} activeTab={activeTab} />
    </SidebarStyled>
  );
}

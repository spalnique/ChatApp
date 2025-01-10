import { useEffect } from 'react';

import { ChatItem } from '@components';
import { useSocketContext } from '@hooks';
import {
  chatApi,
  selectAllChats,
  useAppDispatch,
  useAppSelector,
} from '@reduxtoolkit';
import { ChatListStyled } from '@styled';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const socket = useSocketContext();

  if (socket?.disconnected) socket?.connect();

  const chats = useAppSelector(selectAllChats);
  const sortedChats = chats.toSorted(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  useEffect(() => {
    dispatch(chatApi.getAll());
  }, [dispatch]);

  return (
    <ChatListStyled className="divide-y-[0.5px]">
      {sortedChats.map((chat) => (
        <ChatItem key={chat._id} chat={chat} />
      ))}
    </ChatListStyled>
  );
};
export default ChatList;

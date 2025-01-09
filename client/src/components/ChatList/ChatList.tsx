import { useEffect } from 'react';

import {
  chatApi,
  selectAllChats,
  useAppDispatch,
  useAppSelector,
} from '@reduxtoolkit';
import { ChatListStyled } from '@styled';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectAllChats);

  useEffect(() => {
    dispatch(chatApi.getAll());
  }, [dispatch]);

  return (
    <ChatListStyled>
      {chats.map((chat) => (
        <li key={chat._id}>
          <span>{chat._id}</span>
          <button
            type="button"
            onClick={() => {
              dispatch(chatApi.deleteById(chat._id));
            }}
          >
            remove chat
          </button>
        </li>
      ))}
    </ChatListStyled>
  );
};
export default ChatList;

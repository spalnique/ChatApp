import type { LiHTMLAttributes } from 'react';

import type { Chat } from '@types';

import { Button } from '@components';
import { getAuthor } from '@helpers';
import { useWebsockets } from '@hooks';
import {
  chatApi,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '@reduxtoolkit';
import { ChatItemStyled } from '@styled';

type Props = LiHTMLAttributes<HTMLLIElement> & { chat: Chat };

export default function ChatItem({ chat }: Props) {
  const dispatch = useAppDispatch();
  const ws = useWebsockets();
  const user = useAppSelector(selectUser);

  const participants = chat.participants.filter(
    (member) => member._id !== user?._id
  );

  function handleDeleteChat() {
    ws.deleteChat(chat._id);
  }

  function handleSelectChat() {
    dispatch(chatApi.getById(chat._id));
  }

  return (
    <ChatItemStyled onClick={handleSelectChat}>
      <span>
        {participants.map((participant) => participant.displayName).join(', ')}
      </span>
      <span className="line-clamp-1 w-[85%]">
        {chat.messages.length
          ? getAuthor(chat.messages[0])
          : 'This chat has no messages'}
      </span>
      <Button
        className="absolute right-1 top-5 !size-8"
        label={'x'}
        onClick={handleDeleteChat}
      />
    </ChatItemStyled>
  );
}

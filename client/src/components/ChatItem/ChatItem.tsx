import type { FC, LiHTMLAttributes, MouseEventHandler } from 'react';

import type { Chat } from '@types';

import { Button } from '@components';
import { getAuthor } from '@helpers';
import { useSocketContext } from '@hooks';
import {
  chatApi,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '@reduxtoolkit';
import { ChatItemStyled } from '@styled';

type Props = LiHTMLAttributes<HTMLLIElement> & { chat: Chat };

const ChatItem: FC<Props> = ({ chat }) => {
  const dispatch = useAppDispatch();
  const socket = useSocketContext();
  const user = useAppSelector(selectUser);

  const chatMembers = chat.participants.filter(
    (member) => member._id !== user?._id
  );

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    socket?.emit('chat:delete', chat._id.toString());
  };

  const handleActiveChat: MouseEventHandler<HTMLLIElement> = () => {
    dispatch(chatApi.getById(chat._id));
  };

  return (
    <ChatItemStyled onClick={handleActiveChat}>
      <span>{chatMembers.map((member) => member.displayName).join(', ')}</span>
      <span className="line-clamp-1 w-[85%]">
        {chat.messages.length > 0
          ? getAuthor(chat.messages[0])
          : 'This chat has no messages'}
      </span>
      <Button
        className="absolute right-1 top-5 !size-8"
        label={'x'}
        onClick={handleDelete}
      />
    </ChatItemStyled>
  );
};
export default ChatItem;

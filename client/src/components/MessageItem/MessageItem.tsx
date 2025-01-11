import type { FC } from 'react';

import type { Message } from '@types';

import { getTimestamp } from '@helpers';
import { selectUser, useAppSelector } from '@reduxtoolkit';
import { MessageItemStyled } from '@styled';

type Props = { message: Message };

const MessageItem: FC<Props> = ({ message }) => {
  const user = useAppSelector(selectUser)!;

  const isMyMessage = message.author.username === user.username;

  const timestamp = getTimestamp(message.createdAt);

  return (
    <MessageItemStyled $isMyMessage={isMyMessage}>
      <span>{message.content}</span>
      <span className="self-end text-xs text-gray-600">{timestamp}</span>
    </MessageItemStyled>
  );
};
export default MessageItem;

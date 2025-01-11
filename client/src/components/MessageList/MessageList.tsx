import type { FC } from 'react';

import type { Message } from '@types';

import { MessageItem, NoMessagesFiller } from '@components';
import { MessageListStyled } from '@styled';

type Props = { messages: Message[] };

const MessageList: FC<Props> = ({ messages }) => {
  return (
    <>
      {messages.length ? (
        <MessageListStyled>
          {messages.map((message) => (
            <MessageItem key={message._id} message={message} />
          ))}
        </MessageListStyled>
      ) : (
        <NoMessagesFiller />
      )}
    </>
  );
};
export default MessageList;

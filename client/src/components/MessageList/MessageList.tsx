import type { Message } from '@types';

import { MessageItem, NoMessagesFiller } from '@components';
import { MessageListStyled } from '@styled';

type Props = { messages: Message[] };

export default function MessageList({ messages }: Props) {
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
}

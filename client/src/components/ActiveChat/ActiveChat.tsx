import { MessageInput, MessageList, NoSelectedChatFiller } from '@components';
import { selectActiveChat, useAppSelector } from '@reduxtoolkit';
import { ActiveChatStyled } from '@styled';

export default function ActiveChat() {
  const chat = useAppSelector(selectActiveChat);

  return (
    <ActiveChatStyled>
      {chat ? (
        <MessageList messages={chat.messages} />
      ) : (
        <NoSelectedChatFiller />
      )}
      <MessageInput />
    </ActiveChatStyled>
  );
}

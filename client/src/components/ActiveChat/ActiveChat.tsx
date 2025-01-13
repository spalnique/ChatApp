import { MessageInput, MessageList, NoSelectedChatFiller } from '@components';
import { selectActiveChat, useAppSelector } from '@reduxtoolkit';
import { ActiveChatStyled } from '@styled';

const ActiveChat = () => {
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
};
export default ActiveChat;

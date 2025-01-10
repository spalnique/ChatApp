import { MessageInput, MessageList } from '@components';
import { selectActiveChat, useAppSelector } from '@reduxtoolkit';
import { ActiveChatStyled } from '@styled';

const ActiveChat = () => {
  const chat = useAppSelector(selectActiveChat);

  return (
    <ActiveChatStyled>
      <MessageList chat={chat} />
      <MessageInput />
    </ActiveChatStyled>
  );
};
export default ActiveChat;

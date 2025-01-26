import type { Chat } from '@types';

import { ChatItem } from '@components';
import { ChatListStyled } from '@styled';

type Props = {
  chats: Chat[];
};

export default function ChatList({ chats }: Props) {
  const sortedChats = chats.toSorted(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <ChatListStyled className="divide-y-[0.5px]">
      {sortedChats.map((chat) => (
        <ChatItem key={chat._id} chat={chat} />
      ))}
    </ChatListStyled>
  );
}

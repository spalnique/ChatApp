import type { FC } from 'react';

import type { Chat } from '@types';

type Props = { chat: Chat | null };

const MessageList: FC<Props> = ({ chat }) => {
  return (
    <>
      {chat ? (
        <ul className="mb-[30px] flex grow flex-col-reverse gap-5 overflow-y-scroll px-8">
          {chat.messages.toReversed().map(({ _id, content }, i) => {
            if (i === 0) {
              return (
                <li key={_id} className="text-red-600">
                  <p>{content}</p>
                </li>
              );
            }
            return (
              <li key={_id}>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex h-full items-center justify-center bg-emerald-100">
          Start chatting!
        </div>
      )}
    </>
  );
};
export default MessageList;

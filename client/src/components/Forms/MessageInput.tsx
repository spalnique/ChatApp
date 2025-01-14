import { useForm } from 'react-hook-form';
import type { KeyboardEventHandler, MouseEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import type { MessageContent } from '@types';

import { Button, UserInput } from '@components';
import { useWebsockets } from '@hooks';
import { selectActiveChat, selectUser, useAppSelector } from '@reduxtoolkit';
import { UserInputFormStyled } from '@styled';

const MessageInput = () => {
  const user = useAppSelector(selectUser)!;
  const chat = useAppSelector(selectActiveChat);
  const ws = useWebsockets();

  const { register, handleSubmit, watch, reset } = useForm<MessageContent>({
    defaultValues: { content: '' },
  });

  const onSubmit: SubmitHandler<MessageContent> = ({ content }) => {
    if (!content.trim() || !chat) return;

    ws.sendMessage({
      content,
      author: { displayName: user.displayName, username: user.username },
      chatId: chat._id,
    });

    reset();
  };

  const handleEnterKey: KeyboardEventHandler<HTMLInputElement> = ({ key }) => {
    if (key === 'Enter') handleSubmit(onSubmit);
  };

  const handleSend: MouseEventHandler<HTMLButtonElement> = () => {
    handleSubmit(onSubmit);
  };

  return (
    <div className="flex max-h-[] min-h-[70px] w-full shrink-0 items-center justify-center bg-cyan-900 text-white">
      <UserInputFormStyled onSubmit={handleSubmit(onSubmit)}>
        <UserInput<MessageContent>
          name="content"
          register={register}
          disabled={!chat || !ws.isConnected}
          onKeyDown={handleEnterKey}
        />
        <Button
          type="button"
          label="Send"
          $width={120}
          disabled={!chat || !ws.isConnected || !watch('content')}
          onClick={handleSend}
        />
      </UserInputFormStyled>
    </div>
  );
};
export default MessageInput;

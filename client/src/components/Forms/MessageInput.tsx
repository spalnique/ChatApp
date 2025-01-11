import { useForm } from 'react-hook-form';
import type { KeyboardEventHandler, MouseEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import type { MessageContent } from '@types';

import { Button, UserInput } from '@components';
import { useSocketContext } from '@hooks';
import { selectActiveChat, selectUser, useAppSelector } from '@reduxtoolkit';
import { UserInputFormStyled } from '@styled';

const MessageInput = () => {
  const socket = useSocketContext();
  const user = useAppSelector(selectUser)!;
  const activeChat = useAppSelector(selectActiveChat);

  const { register, handleSubmit, watch, reset } = useForm<MessageContent>({
    defaultValues: { content: '' },
  });

  const onSubmit: SubmitHandler<MessageContent> = ({ content }) => {
    if (!content.trim() || !activeChat) return;

    const data = {
      content,
      author: { displayName: user.displayName, username: user.username },
      chatId: activeChat._id,
    };

    socket?.emit('message:sent', data);

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
          disabled={!activeChat || !socket}
          onKeyDown={handleEnterKey}
        />
        <Button
          type="button"
          label="Send"
          $width={120}
          disabled={!activeChat || !socket || !watch('content')}
          onClick={handleSend}
        />
      </UserInputFormStyled>
    </div>
  );
};
export default MessageInput;

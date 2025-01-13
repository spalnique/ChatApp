import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';

import type { Message } from '@types';

import { getTimestamp, setCursorToEndOfEditableContent } from '@helpers';
import { useSocketContext } from '@hooks';
import { selectActiveChat, selectUser, useAppSelector } from '@reduxtoolkit';
import {
  CancelStyled,
  ConfirmStyled,
  ContentStyled,
  DeleteIconStyled,
  EditIconStyled,
  MessageItemStyled,
  TimestampStyled,
} from '@styled';

type Props = { message: Message };

const MessageItem: FC<Props> = ({ message }) => {
  const user = useAppSelector(selectUser)!;
  const chat = useAppSelector(selectActiveChat)!;
  const socket = useSocketContext();

  const contentRef = useRef<HTMLSpanElement | null>(null);
  const initialValueRef = useRef<string | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const timestamp = getTimestamp(message.createdAt);
  const isMyMessage = message.author.username === user.username;

  function handleConfirm(): void {
    if (isEditing && contentRef.current) {
      setIsEditing(false);

      if (contentRef.current.textContent !== initialValueRef.current) {
        socket?.emit('message:edit', {
          chatId: chat._id,
          messageId: message._id,
          content: contentRef.current.textContent,
        });
        return;
      }

      return;
    }

    if (isDeleting) {
      setIsDeleting(false);
      socket?.emit('message:delete', {
        chatId: chat._id,
        messageId: message._id,
      });
    }
  }

  function handleCancel(): void {
    if (isEditing) {
      if (contentRef.current) {
        if (contentRef.current.textContent !== initialValueRef.current) {
          contentRef.current.textContent = initialValueRef.current;
        }
      }
      setIsEditing(false);
    }

    if (isDeleting) {
      setIsDeleting(false);
    }
  }

  function handleEdit(): void {
    if (contentRef.current) {
      setIsEditing(true);
      setCursorToEndOfEditableContent(contentRef);
      const tId = setTimeout(() => {
        initialValueRef.current = contentRef.current!.textContent;
        contentRef.current!.focus();
        clearTimeout(tId);
      }, 50);
    }
  }

  function handleDelete(): void {
    setIsDeleting(true);
  }

  function handleKeyBasedAction({ key }: KeyboardEvent): void {
    if (key === 'Enter') handleConfirm();
    if (key === 'Escape') handleCancel();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyBasedAction);
    return () => {
      document.removeEventListener('keydown', handleKeyBasedAction);
    };
  });

  return (
    <MessageItemStyled $isMyMessage={isMyMessage} data-id={message._id}>
      <ContentStyled
        contentEditable={isEditing}
        $isEditable={isEditing}
        ref={contentRef}
        // onKeyDown={handleKeyBasedAction}
        spellCheck={false}
        data-id={message._id}
        suppressContentEditableWarning
      >
        {message.content}
      </ContentStyled>
      <TimestampStyled>{timestamp}</TimestampStyled>
      {isMyMessage && (
        <>
          {isEditing || isDeleting ? (
            <>
              <ConfirmStyled onClick={handleConfirm} />
              <CancelStyled onClick={handleCancel} />
            </>
          ) : (
            <>
              <EditIconStyled onClick={handleEdit} />
              <DeleteIconStyled onClick={handleDelete} />
            </>
          )}
        </>
      )}
    </MessageItemStyled>
  );
};
export default MessageItem;

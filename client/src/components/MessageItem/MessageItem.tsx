import { useEffect, useRef, useState } from 'react';

import type { Message } from '@types';

import { getMessageTimestamp, setCursorToEndOfEditableContent } from '@helpers';
import { useWebsockets } from '@hooks';
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

export default function MessageItem({ message }: Props) {
  const user = useAppSelector(selectUser)!;
  const chat = useAppSelector(selectActiveChat)!;
  const ws = useWebsockets();

  const contentRef = useRef<HTMLSpanElement | null>(null);
  const initialValueRef = useRef<string | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const timestamp = getMessageTimestamp(message.createdAt);
  const isMyMessage = message.author.username === user.username;

  function handleConfirm() {
    if (isEditing && contentRef.current) {
      setIsEditing(false);

      if (contentRef.current.textContent !== initialValueRef.current) {
        ws.editMessage(chat._id, message._id, contentRef.current.textContent);
      }
    }

    if (isDeleting) {
      setIsDeleting(false);
      ws.deleteMessage(chat._id, message._id);
    }
  }

  function handleCancel() {
    if (isEditing) {
      if (contentRef.current && initialValueRef.current) {
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

  function handleEdit() {
    if (contentRef.current) {
      setIsEditing(true);
      setCursorToEndOfEditableContent(contentRef);
      const tId = setTimeout(() => {
        initialValueRef.current = contentRef.current?.textContent ?? '';
        contentRef.current!.focus();
        clearTimeout(tId);
      }, 50);
    }
  }

  function handleDelete() {
    setIsDeleting(true);
  }

  function handleKeyBasedAction(event: KeyboardEvent) {
    if (isEditing || isDeleting) {
      event.stopImmediatePropagation();
      if (event.key === 'Enter') handleConfirm();
      if (event.key === 'Escape') handleCancel();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyBasedAction);

    return () => {
      document.removeEventListener('keydown', handleKeyBasedAction);
    };
  });

  return (
    <MessageItemStyled $isMyMessage={isMyMessage}>
      <ContentStyled
        ref={contentRef}
        contentEditable={isEditing}
        spellCheck={false}
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
}

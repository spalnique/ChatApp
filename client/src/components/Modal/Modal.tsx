import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { Button } from '@components';
import { useWebsockets } from '@hooks';

const ModalStyled = styled.dialog`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  margin: auto;
  text-align: center;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const CountdownStyled = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  color: red;
`;

type ModalProps = {
  chatId: string;
};

const Modal = forwardRef<
  { openModal: VoidFunction; isOpen: () => boolean | undefined },
  ModalProps
>(function ({ chatId }, ref) {
  const [countdown, setCountdown] = useState(5);
  const [ellipsis, setEllipsis] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const ws = useWebsockets();

  const handleConfirmDelete = useCallback(
    function () {
      ws.deleteChat(chatId);
      dialogRef.current?.close();
    },
    [ws, dialogRef, chatId]
  );

  function handleCancelDelete() {
    dialogRef.current?.close();
  }

  useImperativeHandle(
    ref,
    () => ({
      isOpen: () => {
        if (dialogRef.current) return dialogRef.current.open;
      },

      openModal: () => {
        if (dialogRef.current) return dialogRef.current.showModal();
      },
    }),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
      setEllipsis((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 1000);

    if (countdown === 0) {
      handleConfirmDelete();
    }

    return () => clearInterval(interval);
  }, [countdown, ws, handleConfirmDelete]);

  return (
    <ModalStyled ref={dialogRef}>
      <p>Are you sure you want to delete this chat?</p>
      <CountdownStyled>
        {countdown}
        {ellipsis}
      </CountdownStyled>
      <Button label="Confirm" onClick={handleConfirmDelete} />
      <Button label="Cancel" onClick={handleCancelDelete} />
    </ModalStyled>
  );
});

Modal.displayName = 'Modal';

export default Modal;

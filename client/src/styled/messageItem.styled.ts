import { BsCheck2Circle, BsXCircle } from 'react-icons/bs';
import { CiEdit, CiTrash } from 'react-icons/ci';
import styled from 'styled-components';

type Props = { $isMyMessage?: boolean };

export const MessageItemStyled = styled.div<Props>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-self: ${({ $isMyMessage }) =>
    $isMyMessage ? 'flex-end' : 'flex-start'};
  min-width: 250px;
  max-width: 400px;
  padding: 6px 12px;
  gap: 8px;
  border-radius: 4px;
  background-color: ${({ $isMyMessage }) =>
    $isMyMessage ? '#a7f3d0' : '#bae6fd'};

  &:hover {
    svg {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const ContentStyled = styled.span<{ contentEditable: boolean }>`
  width: calc(100% - 40px);
  border-radius: 4px;
  outline: none;
  font-style: ${({ contentEditable }) => contentEditable && 'italic'};
`;

export const TimestampStyled = styled.span`
  align-self: flex-end;
  color: #4b5563;
  font-size: 12px;
  line-height: 16px;
`;

export const EditIconStyled = styled(CiEdit)`
  visibility: hidden;
  position: absolute;
  top: 8px;
  right: 28px;
  cursor: pointer;
  opacity: 0;
  transition: all 150ms ease-in-out;
`;

export const DeleteIconStyled = styled(CiTrash)`
  visibility: hidden;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  opacity: 0;
  transition: all 150ms ease-in-out;
`;

export const ConfirmStyled = styled(BsCheck2Circle)`
  color: darkslategrey;
  position: absolute;
  top: 8px;
  right: 28px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
`;

export const CancelStyled = styled(BsXCircle)`
  scale: 0.8125;
  color: crimson;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
`;

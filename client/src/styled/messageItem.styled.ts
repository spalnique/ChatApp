import styled from 'styled-components';

type Props = { $isMyMessage?: boolean };

const MessageItemStyled = styled.div<Props>`
  display: flex;
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
`;

export default MessageItemStyled;

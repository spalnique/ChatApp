import styled from 'styled-components';

const MessageListStyled = styled.ul`
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;
  margin-bottom: 30px;
  padding: 0 32px;
  overflow-y: scroll;
  gap: 20px;
`;

export default MessageListStyled;

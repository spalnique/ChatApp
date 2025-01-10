import styled from 'styled-components';

const ChatItemStyled = styled.li`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 97%;
  padding: 10px 20px;
  gap: 4px;
  cursor: pointer;

  button {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: opacity 150ms ease-in-out;
  }

  &:hover {
    button {
      visibility: visible;
      opacity: 1;
      pointer-events: all;
    }
  }
`;
export default ChatItemStyled;

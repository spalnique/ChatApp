import styled from 'styled-components';

type Props = { $centered: boolean };

const ButtonStyled = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  max-width: 220px;
  padding: 12px 24px;
  margin: ${({ $centered }) => ($centered ? '0 auto' : 'unset')};
  background-color: white;
  border: 0.5px solid black;
  transition:
    background-color 150ms ease-in-out,
    color 150ms ease-in-out;

  &:hover {
    background-color: black;
    color: white;
  }

  &:disabled {
    background-color: gray;
    &:hover {
      color: black;
    }
  }
`;

export default ButtonStyled;

import styled from 'styled-components';

const UserInputStyled = styled.input`
  width: 100%;
  min-height: 40px;
  word-wrap: normal;
  padding: 8px 16px;
  border: 0.5px solid darkgrey;
  outline: none;
  transition: border 150ms ease-in-out;
  color: black;

  &:hover,
  &:focus-within {
    border: 0.5px solid black;
  }

  &:disabled {
    border: 0.5px solid lightgray;
    background-color: rgb(250, 250, 250);
  }
`;

export default UserInputStyled;

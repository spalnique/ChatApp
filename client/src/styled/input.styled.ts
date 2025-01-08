import type { FieldError } from 'react-hook-form';
import styled from 'styled-components';

const InputStyled = styled.input<{ $error: FieldError['message'] }>`
  border: 0.5px solid ${({ $error }) => ($error?.length ? 'red' : 'darkgrey')};
  height: 40px;
  outline: none;
  padding: 8px 16px;
  transition: border 150ms ease-in-out;

  &:hover,
  &:focus-within {
    border: 0.5px solid ${({ $error }) => ($error?.length ? 'red' : 'black')};
  }
`;

export default InputStyled;

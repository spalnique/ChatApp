import styled from 'styled-components';
import type { ButtonHTMLAttributes, FC } from 'react';

const ButtonStyled = styled.button<{ $centered: boolean }>`
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
`;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  centered?: boolean;
};

const Button: FC<Props> = ({ label, centered, ...props }) => {
  return (
    <ButtonStyled $centered={!!centered} {...props}>
      {label}
    </ButtonStyled>
  );
};
export default Button;

import type { ButtonHTMLAttributes, FC } from 'react';

import { ButtonStyled } from '@styled';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  $centered?: boolean;
  $size?: 'small' | 'large';
  $width?: number;
};

const Button: FC<Props> = ({ label, ...props }) => {
  return <ButtonStyled {...props}>{label}</ButtonStyled>;
};
export default Button;

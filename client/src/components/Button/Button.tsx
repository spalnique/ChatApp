import type { ButtonHTMLAttributes, FC } from 'react';

import { ButtonStyled } from '@styled';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  $centered?: boolean;
  $size?: 'small' | 'large' | 'fullwidth';
};

const Button: FC<Props> = ({ label, $centered, $size, ...props }) => {
  return (
    <ButtonStyled $centered={$centered} $size={$size} {...props}>
      {label}
    </ButtonStyled>
  );
};
export default Button;

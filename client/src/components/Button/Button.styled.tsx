import type { ButtonHTMLAttributes, FC } from 'react';

import { ButtonStyled } from '@styled';

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

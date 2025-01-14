import type { ButtonHTMLAttributes } from 'react';

import { ButtonStyled } from '@styled';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  $centered?: boolean;
  $size?: 'small' | 'large';
  $width?: number;
};

export default function Button({ label, ...props }: Props) {
  return <ButtonStyled {...props}>{label}</ButtonStyled>;
}

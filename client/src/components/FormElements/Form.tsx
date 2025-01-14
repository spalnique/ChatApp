import type {
  FormHTMLAttributes,
  PropsWithChildren,
  SVGAttributes,
} from 'react';

import { Logo } from '@components';
import { FormStyled } from '@styled';

type Props = PropsWithChildren &
  FormHTMLAttributes<HTMLFormElement> & {
    logo?: boolean;
    logoProps?: SVGAttributes<SVGElement>;
    clickable?: boolean;
    $direction?: 'row' | 'column';
    $width?: 'fullwidth' | number;
    $shadow?: boolean;
  };

export default function Form({
  logo,
  children,
  logoProps,
  clickable,
  onSubmit,
  ...props
}: Props) {
  return (
    <FormStyled onSubmit={onSubmit} {...props}>
      {logo && (
        <Logo
          style={{ width: 80, height: 80 }}
          {...logoProps}
          clickable={clickable}
        />
      )}
      {children}
    </FormStyled>
  );
}

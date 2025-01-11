import type {
  FC,
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

const Form: FC<Props> = ({
  logo,
  children,
  logoProps,
  clickable,
  onSubmit,
  ...props
}) => {
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
};

export default Form;

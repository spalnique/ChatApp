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
  };

const Form: FC<Props> = ({
  logo,
  children,
  logoProps,
  clickable,
  onSubmit,
}) => {
  return (
    <FormStyled onSubmit={onSubmit}>
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

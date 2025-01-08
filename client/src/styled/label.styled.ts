import styled from 'styled-components';
import type { FieldError } from 'react-hook-form';

const LabelStyled = styled.label<{
  $error: FieldError['message'];
  $fixed?: boolean;
}>`
  color: ${({ $error }) => ($error?.length ? 'red' : 'inherit')};
  font-size: 14px;
  text-align: center;
  ${({ $fixed }) =>
    !$fixed &&
    `background-color: white;
      padding: 4px 10px;
      position: absolute;
      top: -16px;
      left: 14px;`}
`;

export default LabelStyled;

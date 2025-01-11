import styled from 'styled-components';

type Props = {
  $direction?: 'row' | 'column';
  $width?: 'fullwidth' | number;
  $shadow?: boolean;
};

const FormStyled = styled.form<Props>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: 16px;
  width: ${({ $width }) =>
    $width ? (typeof $width === 'string' ? '100%' : `${$width}px`) : '400px'};
  padding: 30px 30px;
  background-color: white;

  box-shadow: ${({ $shadow }) =>
    $shadow && '0px 0px 25px 10px rgb(0, 0, 0, 0.05)'};
`;

export default FormStyled;

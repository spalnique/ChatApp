import styled from 'styled-components';

type Props = {
  $centered?: boolean;
  $size?: 'small' | 'large';
  $width?: number;
};

const ButtonStyled = styled.button<Props>`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  line-height: 1;
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return '6px 12px';
      case 'large':
        return '24px 48px';
      default:
        return '12px 24px';
    }
  }};
  margin: ${({ $centered }) => ($centered ? '0 auto' : 'unset')};
  background-color: ${({ type }) => (type === 'submit' ? 'black' : 'white')};
  color: ${({ type }) => (type === 'submit' ? 'white' : 'black')};
  border: 0.5px solid black;
  transition:
    background-color 150ms ease-in-out,
    color 150ms ease-in-out;

  &:hover {
    border: ${({ type }) => type !== 'submit' && '0.5px solid lightblue'};
    background-color: ${({ type }) =>
      type === 'submit' ? 'darkblue' : 'lightblue'};
    color: white;
  }

  &:disabled {
    border: 0.5px solid lightgray;
    background-color: white;
    color: lightgray;
    &:hover {
    }
  }
`;

export default ButtonStyled;

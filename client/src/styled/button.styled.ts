import styled from 'styled-components';

type Props = { $centered?: boolean; $size?: 'small' | 'large' | 'fullwidth' };

const ButtonStyled = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  width: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return '90px';
      case 'large':
        return '250px';
      case 'fullwidth':
        return '100%';
      default:
        return 'auto';
    }
  }};
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return '6px 12px';
      case 'large':
        return '24px 48px';
      case 'fullwidth':
        return '12px 24px';
      default:
        return '8px';
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
    background-color: ${({ type }) =>
      type === 'submit' ? 'darkblue' : 'lightblue'};
    color: ${({ type }) => (type === 'submit' ? 'white' : 'white')};
    border: ${({ type }) => type !== 'submit' && '0.5px solid lightblue'};
  }

  &:disabled {
    background-color: gray;
    &:hover {
      border: 0.5px solid black;
      color: black;
    }
  }
`;

export default ButtonStyled;

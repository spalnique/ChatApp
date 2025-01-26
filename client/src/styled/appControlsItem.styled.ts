import styled from 'styled-components';

type Props = { $isActive: boolean };

const AppControlsItemStyled = styled.li<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-basis: calc(100% / 3);
  background-color: ${({ $isActive }) => ($isActive ? '#0e7490' : 'inherit')};

  &:not(:last-of-type) {
    border-right: 0.5px solid white;
  }
`;

export default AppControlsItemStyled;

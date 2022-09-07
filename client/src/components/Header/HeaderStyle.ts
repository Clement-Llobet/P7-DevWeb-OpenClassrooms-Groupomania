import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const HeaderStyledComponent = styled.header`
  background-color: ${colors.primary};
`;

export const HeaderNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
`;

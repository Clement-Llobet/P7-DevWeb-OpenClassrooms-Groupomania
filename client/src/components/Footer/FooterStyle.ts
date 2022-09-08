import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const FooterComponent = styled.footer`
  background-color: ${colors.secondary};
  padding: 2%;
  padding-right: 30%;
  padding-left: 30%;
  width: 100%;

  & ul {
    display: flex;
    flex-direction: raw;
    justify-content: space-around;
  }
`;

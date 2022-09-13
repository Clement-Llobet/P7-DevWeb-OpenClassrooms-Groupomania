import styled from 'styled-components';
import colors from '../../utils/style/colors';
import Logo from '../../assets/Logo.png';

export const HeaderStyledComponent = styled.header`
  background-color: ${colors.primary};
`;

export const HeaderNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  padding: 2%;

  li.user-actions {
    font-size: 1.4rem;
    color: #ffffff;
    padding: 1%;
    border-radius: 5px;

    &:hover {
      background-color: #ffffff;
      color: ${colors.primary};
    }
  }

  (Link) {
    color: yellow;
  }
`;

export const LogoImg = styled.img.attrs({
  src: `${Logo}`,
  alt: `Logo Groupomania`,
})`
  width: 30%;
`;

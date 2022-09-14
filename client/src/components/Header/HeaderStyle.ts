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

  li.user-actions,
  li.user-actions > a {
    font-size: 1.4rem;
    color: #ffffff;
    padding: 1%;
    border-radius: 5px;
    cursor: pointer;

    &:hover,
    &:hover > a {
      background-color: #ffffff !important;
      color: ${colors.primary}!important;
    }
  }

  a {
    height: 100%;
  }

  .go-to-profile-page img {
    height: 2% !important;
  }
`;

export const LogoImg = styled.img.attrs({
  src: `${Logo}`,
  alt: `Logo Groupomania`,
})`
  width: 30%;
`;

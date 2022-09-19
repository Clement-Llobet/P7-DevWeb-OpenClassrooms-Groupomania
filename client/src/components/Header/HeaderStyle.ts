import styled from 'styled-components';
import colors from '../../utils/style/colors';
import Logo from '../../assets/Logo.png';

export const HeaderStyledComponent = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
  background-color: ${colors.primary};
`;

export const HeaderNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  list-style-type: none;
  width: 27%;

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
    height: 4rem;
  }
`;

export const LogoImg = styled.img.attrs({
  src: `${Logo}`,
  alt: `Logo Groupomania`,
})`
  width: 15rem;
  // margin-left: 10%;
`;

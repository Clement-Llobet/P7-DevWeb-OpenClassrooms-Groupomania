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

  @media all and (max-width: 992px) {
    flex-direction: column;
  }

  @media all and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeaderNav = styled.nav`
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    list-style-type: none;
    width: auto;
    padding: 2%;
    padding-right: 6%;

    li.user-actions,
    li.user-actions > a {
      font-size: 1.4rem;
      color: #ffffff;
      padding: 3%;
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
      height: 4.5rem;
      border-radius: 50%;
      border: 2px solid ${colors.primary};
      object-fit: cover;
      object-position: center;

      &:hover {
        border: 2px solid #ffffff;
      }
    }

    @media all and (max-width: 992px) {
      width: 100%;
    }

    @media all and (max-width: 768px) {
      width: 100%;
    }
  }
`;

export const LogoImg = styled.img.attrs({
  src: `${Logo}`,
  alt: `Logo Groupomania`,
})`
  width: 15rem;
  }
`;

import styled from 'styled-components';
import colors from '../../utils/style/colors';
import Logo from '../../assets/Logo.png';

export const Wrapper = styled.div`
  background-color: ${colors.primary};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: start;

  & section {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    &.login-section {
      background-color: #ffffff;
      color: ${colors.tertiary};

      & h1 {
        color: ${colors.primary};
        font-size: 2rem;
      }

      & form {
        background-color: #ffffff;
        padding: 5%;
        border: 1px solid ${colors.tertiary};
        border-radius: 2%;
      }

      & fieldset {
        display: flex;
        flex-direction: column;
        justify-content: start;
      }

      & label {
        font-size: 1.2rem;
        margin-bottom: 1%;
      }

      & input {
        height: 2rem;
        margin-bottom: 2.5%;
      }

      & button {
        width: 100%;
        height: 2.2rem;
        font-size: 1.4rem;
        background-color: ${colors.primary};
        color: #ffffff;
        border: none;
        border-radius: 5px;
        margin-bottom: 2.5%;

        &:hover {
          background-color: ${colors.secondary};
          color: ${colors.primary};
          cursor: pointer;
        }
      }

      & p {
        font-style: italic;
        font-size: 1.2rem;
        margin-top: 3%;

        & a:hover {
          color: ${colors.primary};
        }
      }

      & .invalid-message {
        margin-bottom: 5%;

        p {
          margin-bottom: 5%;
        }
      }
    }
  }

  @media all and (max-width: 768px) {
    flex-direction: column;

    & section {
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin: auto;

      &.login-section {
        padding-bottom: 5%;

        & h1 {
          margin-top: 5%;
          margin-bottom: 5%;
          padding: 2%;
          text-align: center;
        }
      }
    }
  }
`;

export const LogoImg = styled.img.attrs({
  src: `${Logo}`,
  alt: `Logo Groupomania`,
})`
  width: 80%;
`;

export const LoginSection = styled.section``;

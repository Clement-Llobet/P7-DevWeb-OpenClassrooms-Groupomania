import styled from 'styled-components';
import colors from '../../utils/style/colors';
import Logo from '../../assets/Logo.png';

export const Wrapper = styled.section`
  background-color: ${colors.primary};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  & h1 {
    color: #ffffff;
    font-size: 2rem;
  }

  & form {
    background-color: #ffffff;
    padding: 2%;
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

  & p {
    font-style: italic;
    font-size: 1rem;
    margin-bottom: 2%:
  }

  .go-to-login, a {
    font-size: 1.2rem;
    color: #ffffff;

    a:hover {
      font-weight: bold;
      text-decoration: underline;
    }
  }

  & input {
    font-style: normal!important;
    height: 2rem;
    margin-bottom: 2.5%;
  }

  & select {
    width: 100%;
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

    &:hover {
      background-color: ${colors.secondary};
      color: ${colors.primary};
      cursor: pointer;
    }
  }

  .invalid-form {
    p {
      font-style: normal;
      font-size: 1.2em;
      text-align: center;
      margin-bottom: 2%;
    }
  }

  .error {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: bold;
    font-size: 1em;
    margin-bottom: 5%;
    background-color: ${colors.primary};
    color: #ffffff;
    padding: 2%;
    border-radius: 10px;
  }
`;

export const LogoImg = styled.img.attrs({
  src: `${Logo}`,
  alt: `Logo Groupomania`,
})`
  width: 30%;
`;

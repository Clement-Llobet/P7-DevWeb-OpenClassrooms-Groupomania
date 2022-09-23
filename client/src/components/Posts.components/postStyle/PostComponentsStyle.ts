import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const PostUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PostLi = styled.li`
  margin: auto;
  margin-bottom: 2%;
  padding: 2%;
  width: 100%;
  border: 1px solid ${colors.secondary};
  border-radius: 1%;
  list-style-type: none;

  &:hover {
    background-color: #ede9e9;
    cursor: pointer;
  }

  .li-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2%;
    color: ${colors.tertiary};

    img {
      width: 15%;
      height: auto;
      border-radius: 50%;
    }

    & div {
      display: flex;
      flex-direction: column;
      justify-content: start;
      padding-left: 5%;

      & h3 {
        font-size: 1.4em;
        font-weight: bold;
        margin-bottom: 10%;
      }

      & p {
        font-size: 1.1em;
      }
    }
  }

  p {
    font-size: 1.2em;
  }

  .post-picture {
    width: 100%;
    height: 30%;
    margin-top: 2%;
    margin-bottom: 2%;
    object-fit: cover;
    object-position: center;
  }
`;

export const SinglePostBody = styled.section`
  min-height: 100vh;
`;

export const SinglePost = styled.article`
  width: 50em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 2%;

  .post-detail {
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5%;
    }

    &__profile-infos {
      width: 50%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &__avatar {
      width: 60%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      & img {
        height: 6em;
        width: auto;
        border-radius: 50%;
      }
    }

    &__name-and-surname {
      font-weight: bold;
      font-size: 1.5em;

      p {
        margin-bottom: 5%;
        margin-top: 5%;
      }
    }

    &__action {
      width: 50%;
      display: flex;
      justify-content: end;

      .close-modal {
        width: 45%;
        color: ${colors.tertiary};
        border: 1px solid ${colors.secondary};
        font-size: 1em;
        padding: 2%;
        border-radius: 5px;
        background-color: #ffffff;
        font-weight: bold;

        &:hover {
          cursor: pointer;
          color: #ffffff;
          background-color: ${colors.tertiary};
        }
      }

      &__buttons {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        button {
          width: 45%;
          color: ${colors.tertiary};
          border: 1px solid ${colors.secondary};
          font-size: 1em;
          padding: 2%;
          border-radius: 5px;
          background-color: #ffffff;

          &:hover {
            cursor: pointer;
            color: #ffffff;
            background-color: ${colors.tertiary};
          }
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 1.5em;
      width: 100%;

      img {
        width: 100%;
      }

      p {
        margin-bottom: 2%;
      }
    }

    &__likes {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      margin-top: 2%;

      button {
        width: 20%;
        color: ${colors.tertiary};
        border: 1px solid ${colors.secondary};
        font-size: 1em;
        padding: 1%;
        border-radius: 5px;
        background-color: #ffffff;
        font-weight: bold;
        font-size: 1em;

        &:hover {
          cursor: pointer;
          color: #ffffff;
          background-color: ${colors.tertiary};
        }
      }

      p {
        margin-left: 2%;
        font-size: 1em;
        font-weight: bold;
        color: ${colors.tertiary};
      }
    }
  }

  hr {
    margin-bottom: 2%;
  }

  @media all and (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 2%;

    .post-detail {
      &__header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      &__action {
        justify-content: center;

        .close-modal {
          background-color: ${colors.tertiary};
          color: #ffffff;
        }
      }

      &__profile-infos {
        width: 100%;
      }

      &__avatar {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-left: 5%;
        margin-right: 5%;

        & img {
          height: 2%;
          width: 20%;
        }
      }

      &__name-and-surname {
        width: 75%;
        display: flex;
        flex-direction: row;
        justify-content: start;

        & p {
          margin-right: 5%;
          font-size: 1em;
        }
      }

      &__action {
        width: 100%;
        margin-top: 5%;
        &__buttons {
          button {
            width: 45%;
            color: #ffffff;
            border: 1px solid ${colors.secondary};
            background-color: ${colors.tertiary};
          }
        }
      }

      &__likes {
        justify-content: center;

        button {
          width: 50%;
          color: #ffffff;
          border: 1px solid ${colors.secondary};
          background-color: ${colors.tertiary};
        }

        p {
          margin-left: 5%;
          font-size: 1em;
          font-weight: bold;
          color: ${colors.tertiary};
        }
      }
    }
  }
`;

export const PostCreateComponent = styled.div`
  width: 100%;
  padding: 5%;
  border: 5px solid ${colors.primary};

  .create-post-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5%;

    h2 {
      font-size: 1.4em;
    }

    button {
      font-size: 1.2em;
      width: 30%;
      background-color: ${colors.tertiary};
      color: #ffffff;
      border: 1px solid ${colors.tertiary};
      border-radius: 10px;

      &:hover {
        cursor: pointer;
        background-color: ${colors.secondary};
        color: ${colors.primary};
        border: 1px solid ${colors.primary};
      }
    }
  }

  fieldset {
    display: flex;
    flex-direction: column;

    input {
      width: 100%;
      font-size: 1em;
      margin-bottom: 5%;
      height: 2em;
    }
  }

  .validate-post-creation {
    width: 100%;
    font-size: 1.2em;
    padding: 2%;
    background-color: ${colors.tertiary};
    color: #ffffff;
    border: 1px solid ${colors.tertiary};
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      background-color: ${colors.secondary};
      color: ${colors.primary};
      border: 1px solid ${colors.primary};
    }
  }
`;

export const PostUpdateComponent = styled.div`
  border: 1px solid ${colors.secondary};
  border-radius: 5px;
  padding: 5%;
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 5%;
    color: ${colors.primary};
  }

  form {
    padding: 5%;

    textarea {
      width: 100%;
      margin-bottom: 5%;
    }
  }

  .button-validation {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      width: 40%;
      height: 2em;
      background-color: ${colors.tertiary};
      font-size: 1.5em;
      font-weight: bold;
      color: #ffffff;
      border: 1px solid ${colors.secondary};
      border-radius: 5px;

      &:hover {
        background-color: ${colors.secondary};
        color: ${colors.tertiary};
        border: 1px solid ${colors.tertiary};
      }
    }
  }

  .success-message {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors.tertiary};
    margin-top: 2%;
    padding: 2%;
    border-radius: 5px;

    p {
      text-align: center;
      width: 100%;
      color: #ffffff;
      margin-bottom: 2%;
      font-size: 1.2em;
    }

    button {
      width: 62%;
      height: 1.6em;
      font-size: 1.2em;
      background-color: #ffffff;
      border: none;
      border-radius: 5px;
      font-weight: bold;

      &:hover {
        background-color: ${colors.secondary};
      }
    }
  }

  @media all and (max-width: 768px) {
    form {
      padding: 2%;

      textarea {
        width: 100%;
        margin-bottom: 5%;
      }
    }
  }
`;

export const PostDeleteComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  padding: 5%;

  h2 {
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 5%;
    color: #ffffff;
  }

  button {
    width: 40%;
    height: 2em;
    background-color: #ffffff;
    font-size: 1.5em;
    font-weight: bold;
    color: ${colors.tertiary};
    border: 1px solid ${colors.tertiary};
    border-radius: 5px;

    &:hover {
      background-color: ${colors.tertiary};
      color: #ffffff;
      border: 1px solid ${colors.tertiary};
      cursor: pointer;
    }
  }

  @media all and (max-width: 768px) {
    button {
      font-size: 1em;
    }
  }
`;

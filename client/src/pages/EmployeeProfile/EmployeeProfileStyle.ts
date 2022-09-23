import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const Main = styled.main`
  background-color: ${colors.tertiary};
  width: 100vw;
  min-height: 100%;
`;

export const ThisEmployeeProfile = styled.section`
  background-color: #ffffff;
  width: 60%;
  height: 100vh;
  margin: auto;
  padding: 5%;
  display: flex;
  align-items: center;

  hr {
    width: 100%;
    margin-top: 2%;
    margin-bottom: 2%;
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;

    .employee-profile {
      width: 100%;
      height: 100%;

      &__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        img {
          width: 30%;
          padding; 2%;
          border-radius: 50%;
        }

        &__name-and-surname {
          margin-left: 2%;
          font-size: 2em;
          word-break: break-word;
          width: 30%;
        }
      }

      &__button-actions {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 2%;

        button {
          width: 100%;
          font-size: 1.2em;
          height: 2em;
          margin-top: 2.5%;
          margin-bottom: 2.5%;
          background-color: ${colors.secondary};
          color: ${colors.tertiary};
          border: 1px solid ${colors.tertiary};
          border-radius: 5px;

          &:hover {
            background-color: ${colors.tertiary};
            color: #ffffff;
            border: 1px solid ${colors.secondary};
            cursor: pointer;
          }
        }
      }

      &__login {
        font-size: 1.5em;
      }

      &__likes {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
      }

      &__modify {
        display: flex;
        flex-direction: column;

        &__header {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          width: 100%;

          img {
            width: 100%;
            padding; 2%;
            border-radius: 50%;
          }

          &__name-and-surname {
            margin-left: 2%;
            width: 100%;
          }
        }

        &__buttons {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-top: 5%;
          
          button {
            width: 40%;
            font-size: 1.5em;
            height: 2em;
            background-color: ${colors.secondary};
            color: ${colors.tertiary};
            border: 1px solid ${colors.tertiary};
            border-radius: 10px;

            &:hover {
              background-color: ${colors.tertiary};
              color: #ffffff;
              border: 1px solid ${colors.secondary};
              cursor: pointer;
              font-weight: bold;
            }
          }
        }
      }
    }

    label {
      font-size: 1.4em;
      margin-bottom: 2%;
      margin-top: 2%;
    }

    input[type='text'], input[type='email'], input[type='password'] {
      font-size: 1.4em;
    }
    
  }

  @media all and (max-width: 992px) {
    width: 80%;

    .employee-profile {
      &__header {
        &__name-and-surname {
          font-size: 1.8em!important;
        }
      }

      &__button-actions {
        button {
          background-color: ${colors.tertiary}!important;
          color: #ffffff!important;
          border: 1px solid ${colors.secondary}!important;
        }
      }

      &__modify {
        &__header {
          flex-direction: column!important;
          justify-content: center!important;

          img {
            width: 40%!important;
          }
        }
      }
    }
  }

  @media all and (max-width: 768px) {
    width: 100%;

    .employee-profile {
      &__header {
        flex-direction: column!important;

        img {
          width: 100%!important;
          margin-bottom: 5%;
        }

        &__name-and-surname {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%!important;
          padding-left: 20%;
          padding-right: 20%;
          margin-left: 0;
          margin-bottom: 5%;
        }

        &__modify {
          &__header {
            align-items: center;
            width: 30%!important;
            margin: auto!important;

            img {
              width: 100%!important;
            }
          }
        }
      }

      &__button-actions {
        width: 100%!important;
      }
    }
  }
`;

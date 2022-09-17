import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const Main = styled.main`
  background-color: ${colors.tertiary};
  width: 100vw;
  height: 100vh;
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
  }

  div {
    // border: 1px solid black;
    width: 100%;
    display: flex;
    flex-direction: column;

    .employee-profile {
      &__header {
        display: flex;
        flex-direction: row;

        img {
          width: 40%;
          height: 60%;
          padding; 2%;
        }
      }

      &__button-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 20%;
        padding: 2%;
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
        }

        &__buttons {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          
          button {
            width: 40%;
          }
        }
      }
    }
  }
`;

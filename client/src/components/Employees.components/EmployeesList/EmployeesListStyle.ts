import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const EmployeesDetails = styled.div`
  ul {
    width: 100%;
  }

  li {
    display: flex;
    flex-direction: row;
    space-between: space-between;
    align-items: center;
    height: 5em;
    font-size: 1.2em;
  }

  .li-head {
    background-color: ${colors.tertiary};
    color: #ffffff;
    border: 1px solid ${colors.tertiary};

    &:hover {
      background-color: ${colors.tertiary}!important;
    }
  }

  .when-max-width {
    display: none;
  }

  .employee-row {
    margin-right: 2%;
    margin-left: 2%;
    text-align: center;
    align-items: center;
    word-wrap: break-word;
    border-bottom: 1px solid ${colors.secondary};

    &:hover {
      background-color: ${colors.secondary};
    }

    &__id {
      width: 4%;
    }

    &__avatar {
      width: 10%;

      & img {
        padding: 2%;
        height: 4em;
        border-radius: 50%;
      }
    }

    &__surname,
    &__name {
      width: 14%;
    }

    &__email {
      width: 26%;
    }

    &__moderation {
      width: 8%;
    }

    &__action {
      width: 25%;
    }
  }

  button {
    width: 40%;
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

  @media all and (max-width: 992px) {
    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 2%;
    }

    li {
      height: auto;
      max-width: 30%;
      border: 1px solid ${colors.tertiary};
      border-radius: 10px;
      margin-bottom: 5%;
      padding: 2%;
    }

    .li-head {
      display: none !important;
    }

    hr {
      width: 100%;
    }

    .when-max-width {
      display: inline-block;
    }

    .employee-row {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-right: 0%;
      margin-left: 0%;
      border-bottom: 1px solid ${colors.tertiary};

      &:hover {
        background-color: ${colors.secondary};
      }

      &__id {
        width: 100%;
      }

      &__avatar {
        width: 20%;
        height: 3em;
        margin-bottom: 5%;

        & img {
          padding: 0%;
          height: 3em;
        }
      }

      &__surname,
      &__name {
        width: auto;
      }

      &__email {
        width: 100%;
        text-align: left;
        padding-bottom: 5%;
      }

      &__moderation {
        width: 100%;
        text-align: left;
        padding-bottom: 5%;

        span {
          margin-right: 2%;
        }
      }

      &__action {
        width: 100%;
      }
    }

    button {
      width: 40%;
      color: #ffffff;
      font-size: 0.8em;
      background-color: ${colors.tertiary};

      &:hover {
        cursor: pointer;
        color: ${colors.tertiary};
        background-color: #ffffff;
      }
    }
  }

  @media all and (max-width: 768px) {
    li {
      max-width: 100% !important;
      width: 100%;
    }

    .employee-row {
      &__avatar {
        width: 30%;
        height: 6em;
        & img {
          height: 6em;
        }
      }
    }
  }
`;

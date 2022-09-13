import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const PostDetails = styled.div`
  ul {
    width: 100%;
  }

  li {
    display: flex;
    flex-direction: row;
    space-between: space-between;
    align-items: center;
    height: 5rem;
    font-size: 1.2rem;
  }

  .li-head {
    background-color: ${colors.tertiary};
    color: #ffffff;
    border: 1px solid ${colors.tertiary};

    &:hover {
      background-color: ${colors.tertiary}!important;
    }
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
        height: 4rem;
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
      width: 7%;
    }

    &__action {
      width: 25%;
    }
  }

  button {
    width: 40%;
    color: ${colors.tertiary};
    border: 1px solid ${colors.secondary};
    font-size: 1rem;
    padding: 2%;
    border-radius: 5px;
    background-color: #ffffff;

    &:hover {
      cursor: pointer;
      color: #ffffff;
      background-color: ${colors.tertiary};
    }
  }

  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

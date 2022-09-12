import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const PostDetails = styled.div`
  width: 100%;

  ul {
    width: 100%;
  }

  li {
    width: 100%;
    display: flex;
    flex-direction: row;
    space-between: space-between;
    align-items: center;
    height: 5rem;
    // border: 1px solid ${colors.primary};
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
      width: 20%;
    }
  }
`;

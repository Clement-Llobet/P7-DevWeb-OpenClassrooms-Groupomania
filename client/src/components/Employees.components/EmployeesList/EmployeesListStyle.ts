import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const PostDetails = styled.div`
  width: 100%;

  ul {
    width: 100%;
  }

  .employee-row {
    display: flex;
    flex-direction: row;
    space-between: start;
    width: 100%;
    height: 2rem;
    margin-right: 2%;
    margin-left: 2%;
    text-align: center;
    align-items: center;

    &__id {
      width: 3%;
      border: 1px solid ${colors.secondary};
      padding: 0.5%;
    }

    &__avatar {
      border: 1px solid ${colors.secondary};
      padding: 0.5%;
      width: 20%;

      & img {
        height: 50%;
        width: 50%;
      }
    }

    &__surname,
    &__name {
      border: 1px solid ${colors.secondary};
      padding: 0.5%;
      width: 10%;
    }

    &__email {
      border: 1px solid ${colors.secondary};
      padding: 0.5%;
      width: 20%;
    }

    &__moderation {
      border: 1px solid ${colors.secondary};
      padding: 0.5%;
      width: 10%;
    }

    &__update-and-delete {
      border: 1px solid ${colors.secondary};
      // padding: 0.05%;
      width: 20%;
    }
  }
`;

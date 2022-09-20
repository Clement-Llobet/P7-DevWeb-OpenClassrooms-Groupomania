import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const PostUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // width: 100%;
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
  }

  .li-header {
    display: flex;
    flex-direction: row;
    margin-bottom: 2%;
    color: ${colors.tertiary};

    img {
      width: 10%;
      height: auto;
    }

    & div {
      display: flex;
      flex-direction: column;
      justify-content: start;
      padding-left: 2%;

      & h3 {
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: 10%;
      }

      & p {
        font-size: 1.1rem;
      }
    }
  }

  p {
    font-size: 1.2rem;
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
  height: 100%;
`;

export const SinglePost = styled.article`
  width: 50rem;
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
    }

    &__profile-infos {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &__avatar {
      width: 2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      & img {
        height: 5rem;
        width: auto;
        border-radius: 25%;
      }
    }

    &__name-and-surname {
      font-weight: bold;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      & img {
        max-height: 25vh;
        width: 25vw;
      }
    }
  }
`;

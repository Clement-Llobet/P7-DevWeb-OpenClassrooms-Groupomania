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

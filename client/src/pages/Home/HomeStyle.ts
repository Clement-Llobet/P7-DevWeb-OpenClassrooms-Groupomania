import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const HomeMain = styled.main`
  // width: 50%;
  background-color: ${colors.secondary};
`;

export const PostContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #ffffff;
  width: 50%;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-top: 2%;
    margin-bottom: 2%;
  }

  h2 {
    font-size: 1.4rem;
    margin-bottom: 2%;
  }
`;

export const CreatePost = styled.div`
  display: flex;
  flex-direction: raw;
  justify-content: space-around;
  width: 100%;

  .create-post {
    width: 100% !important;
    display: flex;
    flex-direction: raw;
    justify-content: space-around;
    align-items: center;
    height: 2rem;
    padding-top: 5%;
    padding-bottom: 5%;
    font-size: 1.3rem;
    font-weight: bold;
    border-radius: 0px;
    border: none;
    background-color: ${colors.primary};
    color: #ffffff;

    &:hover {
      cursor: pointer;
      background-color: ${colors.secondary};
      color: ${colors.tertiary};
    }
  }
`;

import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const PostUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const PostLi = styled.li`
  margin: auto;
  margin-bottom: 2%;
  padding: 2%;
  width: 48%;
  border: 1px solid ${colors.secondary};
  border-radius: 1%;
  list-style-type: none;
`;

import styled, { StyledComponent } from 'styled-components';
import colors from '../../../utils/style/colors';

export const EmployeeActionModal = styled.div`
  p {
    font-size: 1.1rem;
    margin-bottom: 2%;
    font-weight: bold;
    color: ${colors.primary};
  }
`;

export const ModifyModerationForm = styled.form.attrs({
  action: '',
})`
  width: 100%;
`;

export const DeleteProfile = styled.div`
  font-size: 1.4em;
  color: #ffffff;
  background-color: ${colors.primary};
  padding: 5%;
  border-radius: 10px;

  div.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    button {
      width: 40%;
      font-size: 1.2em;
      background-color: #ffffff;
      color: ${colors.primary};
      border: 1px solid #ffffff;
      border-radius: 10px;
      margin-top: 5%;

      &:hover {
        cursor: pointer;
        background-color: ${colors.secondary};
        color: ${colors.tertiary};
        border: 1px solid ${colors.tertiary};
      }
    }
  }

  @media all and (max-width: 768px) {
    div.buttons {
      flex-direction: column;

      button {
        width: 100%;
      }
    }
  }
`;

import styled from 'styled-components';
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
  background-color: ${colors.tertiary};
`;

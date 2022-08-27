import { SyntheticEvent, useState } from 'react';
import { EmployeesData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface IUpdateEmployeeModal {
  employee: EmployeesData;
  showUpdateAndDeleteButtons: any;
}

const UpdateEmployeeModal: React.FC<IUpdateEmployeeModal> = ({
  employee,
  showUpdateAndDeleteButtons,
}) => {
  const [updateThisPost, setUpdateThisPost] = useState<boolean>(false);
  const [errorUpdateMessage, setErrorUpdateMessage] = useState<boolean>(false);
  const [changeModeration, setChangeModeration] = useState(false);

  let employeeToUpdate: EmployeesData = {
    moderation: changeModeration,
  };

  const checkAndUpdateModeration = async (option: HTMLSelectElement) => {
    if (option.value === 'executive') {
      setChangeModeration(true);
    } else if (option.value === 'non-executive') {
      setChangeModeration(false);
    } else {
      return;
    }
  };

  const sendUpdateOrder = async () => {
    if (employeeToUpdate.moderation === null) {
      setErrorUpdateMessage(true);
      return;
    }
    await api.apiUpdateEmployees(currentToken(), employeeToUpdate);
  };

  return (
    <form action="">
      <select
        name="status"
        id="registration_status"
        required
        onChange={(e: SyntheticEvent) =>
          checkAndUpdateModeration(e.currentTarget as HTMLSelectElement)
        }
      >
        <option value="choose-status">Votre statut</option>
        <option value="executive">Cadre</option>
        <option value="non-executive">Non-cadre</option>
      </select>
      <button onClick={sendUpdateOrder}>Valider</button>
      <button
        onClick={() => {
          showUpdateAndDeleteButtons(true);
        }}
      >
        Annuler
      </button>
    </form>
  );
};

export default UpdateEmployeeModal;

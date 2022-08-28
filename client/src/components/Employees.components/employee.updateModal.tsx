import React, { SyntheticEvent, useEffect, useState } from 'react';
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
  const [errorUpdateMessage, setErrorUpdateMessage] = useState<boolean>(false);
  const [validUpdateMessage, setValidUpdateMessage] = useState<boolean>(false);
  const [changeModeration, setChangeModeration] = useState<number | null>(null);

  const checkAndUpdateModeration = async (option: HTMLSelectElement) => {
    if (option.value === 'executive') {
      setChangeModeration(1);
      setErrorUpdateMessage(false);
    } else if (option.value === 'non-executive') {
      setChangeModeration(0);
      setErrorUpdateMessage(false);
    } else {
      if (employee.moderation === null) {
        setErrorUpdateMessage(true);
        return;
      }
      setChangeModeration(null);
    }
  };

  useEffect(() => {
    employee.moderation = changeModeration;
  }, [changeModeration, employee]);

  const sendUpdateOrder = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (employee.moderation === null) {
      setErrorUpdateMessage(true);
      return;
    }
    await api.apiUpdateEmployees(currentToken(), employee);
    setValidUpdateMessage(true);
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
      <button onClick={(e) => sendUpdateOrder(e)}>Valider</button>
      <button
        onClick={() => {
          showUpdateAndDeleteButtons(true);
        }}
      >
        Annuler
      </button>
      {errorUpdateMessage && (
        <div>
          <p>
            Attention, vous devez sélectionner un statut pour cet utilisateur !
          </p>
          <button onClick={() => setErrorUpdateMessage(false)}>Fermer</button>
        </div>
      )}
      {validUpdateMessage && (
        <div>
          <p>Votre modification a bien été prise en compte.</p>
          <button
            onClick={() => {
              setValidUpdateMessage(false);
            }}
          >
            Fermer
          </button>
        </div>
      )}
    </form>
  );
};

export default UpdateEmployeeModal;

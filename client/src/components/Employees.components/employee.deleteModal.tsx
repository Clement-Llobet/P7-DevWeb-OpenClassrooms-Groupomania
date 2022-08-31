import React, { useState } from 'react';
import { EmployeesData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface IDeleteEmployeeModal {
  employee: EmployeesData;
  showUpdateAndDeleteButtons: boolean;
  setShowUpdateAndDeleteButtons: any;
}

const DeleteEmployeeModal: React.FC<IDeleteEmployeeModal> = ({
  employee,
  showUpdateAndDeleteButtons,
  setShowUpdateAndDeleteButtons,
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [errorUpdateMessage, setErrorUpdateMessage] = useState<boolean>(false);

  const sendDeleteOrder = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (employee.id === null) {
      setErrorUpdateMessage(true);
      return;
    }
    await api.apiDeleteEmployees(currentToken(), employee.id?.toString());
  };

  return (
    <div>
      {!showUpdateAndDeleteButtons &&
        !deleteConfirmation &&
        !errorUpdateMessage && (
          <>
            <h3>Voulez-vous vraiment supprimer cet employé ?</h3>
            <button
              onClick={(e) => {
                sendDeleteOrder(e);
                setDeleteConfirmation(true);
                setShowUpdateAndDeleteButtons(false);
              }}
            >
              Oui
            </button>
            <button onClick={() => {}}>Non</button>
          </>
        )}

      {deleteConfirmation && (
        <div>
          <p>L'employé a bien été supprimé.</p>
          <button
            onClick={() => {
              setDeleteConfirmation(true);
              setShowUpdateAndDeleteButtons(true);
            }}
          >
            Fermer
          </button>
        </div>
      )}

      {errorUpdateMessage && (
        <div>
          <p>Une erreur est survenue.</p>
          <button onClick={() => setErrorUpdateMessage(false)}>Fermer</button>
        </div>
      )}
    </div>
  );
};

export default DeleteEmployeeModal;

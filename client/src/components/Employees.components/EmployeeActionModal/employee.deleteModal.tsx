import React, { Dispatch, useState } from 'react';
import { EmployeesData } from '../../../interfaces';
import { ApiService } from '../../../service/api.service';
import { currentToken } from '../../../service/getCurrentToken';
import { EmployeeActionModal } from './employeeModalStyle';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface IDeleteEmployeeModal {
  employee: EmployeesData;
  showUpdateAndDeleteButtons: boolean;
  setShowUpdateAndDeleteButtons: any;
  employeesListSetter: Dispatch<React.SetStateAction<EmployeesData[] | null>>;
}

const DeleteEmployeeModal: React.FC<IDeleteEmployeeModal> = ({
  employee,
  showUpdateAndDeleteButtons,
  setShowUpdateAndDeleteButtons,
  employeesListSetter,
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

  const updateEmployeesList = async (e: React.MouseEvent) => {
    e.preventDefault();
    const result: EmployeesData[] = await api.apiGetAllEmployees(
      currentToken()
    );
    employeesListSetter(result);
  };

  return (
    <EmployeeActionModal>
      {!showUpdateAndDeleteButtons &&
        !deleteConfirmation &&
        !errorUpdateMessage && (
          <>
            <p>Voulez-vous vraiment supprimer cet employé ?</p>
            <div className="button-container">
              <button
                onClick={(e) => {
                  sendDeleteOrder(e);
                  setDeleteConfirmation(true);
                  setShowUpdateAndDeleteButtons(false);
                }}
              >
                Oui
              </button>
              <button
                onClick={() => {
                  setShowUpdateAndDeleteButtons(true);
                }}
              >
                Non
              </button>
            </div>
          </>
        )}

      {deleteConfirmation && (
        <div>
          <p>L'employé a bien été supprimé.</p>
          <button
            onClick={(e) => {
              setDeleteConfirmation(true);
              setShowUpdateAndDeleteButtons(true);
              updateEmployeesList(e);
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
    </EmployeeActionModal>
  );
};

export default DeleteEmployeeModal;

import React, { useState } from 'react';
import { EmployeesData, PostsData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface IDeleteEmployeeModal {
  employee: EmployeesData;
  showDeleteButtons: any;
}

const DeleteEmployeeModal: React.FC<IDeleteEmployeeModal> = ({
  employee,
  showDeleteButtons,
}) => {
  const [errorUpdateMessage, setErrorUpdateMessage] = useState<boolean>(false);

  const sendDeleteOrder = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (employee.id === null) {
      setErrorUpdateMessage(true);
      return;
    }
    console.log(currentToken() + ' || ' + employee.id?.toString());
    await api.apiDeleteEmployees(currentToken(), employee.id?.toString());
  };

  return (
    <div>
      <h3>Voulez-vous vraiment supprimer cet employé ?</h3>
      <button onClick={(e) => sendDeleteOrder(e)}>Oui</button>
      <button
        onClick={() => {
          showDeleteButtons(false);
        }}
      >
        Non
      </button>

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

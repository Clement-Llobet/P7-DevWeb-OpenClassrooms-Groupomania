import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeesData } from '../../../interfaces';
import { ApiService } from '../../../service/api.service';
import { currentToken } from '../../../service/getCurrentToken';
import { DeleteProfile } from './employeeModalStyle';

const api = new ApiService('http://localhost:8000/');

interface IDeleteEmployeeProfile {
  singleEmployee: EmployeesData | null;
  isDeletingSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteEmployeeProfile: React.FC<IDeleteEmployeeProfile> = ({
  singleEmployee,
  isDeletingSetter,
}) => {
  const navigate = useNavigate();

  const sendDeleteOrder = async (id: number) => {
    await api.apiDeleteEmployees(currentToken(), id.toString());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <DeleteProfile>
      <p>
        Voulez-vous vraiment supprimer votre compte ? Cette action est
        définitive.
      </p>
      <div className="buttons">
        <button onClick={() => sendDeleteOrder(singleEmployee?.id!)}>
          Valider
        </button>
        <button onClick={() => isDeletingSetter(false)}>Annuler</button>
      </div>
    </DeleteProfile>
  );
};

export default DeleteEmployeeProfile;

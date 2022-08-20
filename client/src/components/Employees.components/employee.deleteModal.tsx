import { useState } from 'react';
import { PostsData } from '../../interfaces';
import { ApiService } from '../../service/api.service';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const DeleteEmployeeModal: React.FC = () => {
  const [wantToDelete, setWantToDelete] = useState(false);

  const deleteEmployee = async () => {
    setWantToDelete(true);

    const employeeToDelete: PostsData = {
      // A SUPPRIMER
      id: 1,
      text: '',
      urlImage: '',
      EmployeeId: 2,
    };

    if (wantToDelete) {
      // await api.apiDeletePost(employeeToDelete); // IL FAUT PASSER EN PARAMETRE L'ID DE L'EMPLOYÉ !!!
    }
  };

  return (
    <div>
      <h3>Voulez-vous vraiment supprimer ce post ?</h3>
      <button onClick={() => deleteEmployee}>Oui</button>
      <button onClick={() => setWantToDelete(false)}>Non</button>
    </div>
  );
};

export default DeleteEmployeeModal;

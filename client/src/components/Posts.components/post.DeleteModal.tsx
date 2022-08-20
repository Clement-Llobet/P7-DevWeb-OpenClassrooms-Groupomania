import { useState } from 'react';
import { PostsData } from '../../interfaces';
import { ApiService } from '../../service/api.service';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const DeleteModal: React.FC = () => {
  const [wantToDelete, setWantToDelete] = useState(false);

  const deletePost = async () => {
    setWantToDelete(true);

    const postToDelete: PostsData = {
      // A SUPPRIMER
      id: 1,
      text: '',
      urlImage: '',
      EmployeeId: 2,
    };

    if (wantToDelete) {
      // await api.apiDeletePost(postToDelete); // IL FAUT PASSER EN PARAMETRE L'ID DU POST !!!
    }
  };

  return (
    <div>
      <h3>Voulez-vous vraiment supprimer ce post ?</h3>
      <button onClick={() => deletePost}>Oui</button>
      <button onClick={() => setWantToDelete(false)}>Non</button>
    </div>
  );
};

export default DeleteModal;

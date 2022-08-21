import { useParams } from 'react-router-dom';
import { ApiService } from '../../service/api.service';
import { PostIdParams } from '../../types/postId.type';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const DeleteModal: React.FC = () => {
  const { id } = useParams<PostIdParams>();

  const deletePost = async () => {
    await api.apiDeletePost(id);
  };

  return (
    <div>
      <h3>Voulez-vous vraiment supprimer ce post ?</h3>
      <button onClick={() => deletePost()}>Confirmer</button>
    </div>
  );
};

export default DeleteModal;

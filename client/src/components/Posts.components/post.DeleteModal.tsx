import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';
import { PostIdParams } from '../../types/types';
import { PostDeleteComponent } from './postStyle/PostComponentsStyle';

const api = new ApiService('http://localhost:8000/');

const DeleteModal: React.FC = () => {
  const { id } = useParams<PostIdParams>();

  const navigate = useNavigate();

  const deletePost = async () => {
    await api.apiDeletePost(currentToken(), id);
    navigate('/Home');
  };

  return (
    <PostDeleteComponent>
      <h2>Voulez-vous vraiment supprimer ce post ?</h2>
      <button onClick={() => deletePost()}>Confirmer</button>
    </PostDeleteComponent>
  );
};

export default DeleteModal;

import { useState, useContext } from 'react';
import AllModalsContext from '../../utils/context';
import { Link } from 'react-router-dom';
import { PostsData } from '../../interfaces';
import DeleteModal from './post.DeleteModal';
import UpdatePostModal from './post.UpdateModal';

interface PostDetailProps {
  singlePost: PostsData | null;
}

const PostDetails: React.FC<PostDetailProps> = ({ singlePost }) => {
  const { isOpen } = useContext(AllModalsContext);

  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const showUpdatePostModal = async () => {
    setUpdateModal(true);
  };

  const showDeleteModal = async () => {
    setDeleteModal(true);
  };

  return (
    <div>
      <h1>Post n°{singlePost?.id}</h1>

      <p onClick={showUpdatePostModal}>Modifier le post</p>
      <p onClick={showDeleteModal}>Supprimer le post</p>

      {updateModal ? (
        <UpdatePostModal
          defaultValueText={singlePost?.text}
          defaultValueUrlImage={singlePost?.urlImage}
          postId={singlePost?.id}
        />
      ) : (
        <div>
          <p>{singlePost?.text}</p>
          <img src={singlePost?.urlImage} alt="" />
        </div>
      )}

      <div>{deleteModal && <DeleteModal />}</div>

      <Link to="/home">Accueil</Link>
    </div>
  );
};

export default PostDetails;

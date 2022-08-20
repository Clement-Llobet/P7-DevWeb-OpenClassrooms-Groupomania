import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostsData } from '../../interfaces';
import DeleteModal from './post.DeleteModal';
import UpdatePostModal from './post.UpdateModal';

interface PostDetailProps {
  singlePost: PostsData | null;
}

const PostDetails: React.FC<PostDetailProps> = ({ singlePost }) => {
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
      <p>{singlePost?.text}</p>
      <img src={singlePost?.urlImage} alt="" />

      <div>
        <p onClick={showUpdatePostModal}>Modifier le post</p>
        <p onClick={showDeleteModal}>Supprimer le post</p>
        {updateModal && <UpdatePostModal />}
        {deleteModal && <DeleteModal />}
      </div>

      <Link to="/home">Accueil</Link>
    </div>
  );
};

export default PostDetails;
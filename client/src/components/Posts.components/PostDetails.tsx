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
  // const { setModalOpening, isOpen } = useContext(AllModalsContext);

  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const showUpdatePostModal = async () => {
    setModal(true);
    setUpdateModal(true);
    setDeleteModal(false);
  };

  const showDeleteModal = async () => {
    setModal(true);
    setDeleteModal(true);
    setUpdateModal(false);
  };

  return (
    <section>
      <div>
        <h2>Post n°{singlePost?.id}</h2>
        {modal && updateModal && (
          <i onClick={() => setUpdateModal(false)}>Fermer</i>
        )}
        {modal && deleteModal && (
          <i onClick={() => setDeleteModal(false)}>Fermer</i>
        )}
      </div>

      <p onClick={showUpdatePostModal}>Modifier le post</p>
      <p onClick={showDeleteModal}>Supprimer le post</p>

      {modal && updateModal ? (
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

      {modal && deleteModal && <DeleteModal />}

      <Link to="/home">Accueil</Link>
    </section>
  );
};

export default PostDetails;

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PostsData } from '../../interfaces';
import DeleteModal from './post.DeleteModal';
import UpdatePostModal from './post.UpdateModal';
import { ApiService } from '../../service/api.service';

interface PostDetailProps {
  singlePost: PostsData | null;
}

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const PostDetails: React.FC<PostDetailProps> = ({ singlePost }) => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [like, setLike] = useState(false);

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

  const handleLike = async () => {
    like
      ? setLike(false)
      : // await api.apiCreateLike();
        setLike(true);
  };

  return (
    <section>
      <div>
        <h2>Post n°{singlePost?.id}</h2>
        {modal && updateModal && (
          <button
            onClick={() => {
              setUpdateModal(false);
              setModal(false);
            }}
          >
            Fermer
          </button>
        )}
        {modal && deleteModal && (
          <button
            onClick={() => {
              setDeleteModal(false);
              setModal(false);
            }}
          >
            Fermer
          </button>
        )}
      </div>

      {!modal && (
        <button onClick={showUpdatePostModal}>Modifier le post</button>
      )}
      {!modal && <button onClick={showDeleteModal}>Supprimer le post</button>}

      {modal && updateModal ? (
        <UpdatePostModal
          defaultValueText={singlePost?.text}
          // defaultValueUrlImage={singlePost?.urlImage}
          postId={singlePost?.id}
        />
      ) : (
        <div>
          <div>
            <p>{singlePost?.text}</p>
            {/* <img src={singlePost?.urlImage} alt="" /> */}
          </div>
          <div>
            <button onClick={() => handleLike()}>Like</button>
          </div>
        </div>
      )}

      {modal && deleteModal && <DeleteModal />}

      <Link to="/home">Accueil</Link>
    </section>
  );
};

export default PostDetails;

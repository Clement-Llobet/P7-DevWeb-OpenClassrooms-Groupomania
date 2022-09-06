import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EmployeesData, LikesData, PostsData } from '../../interfaces';
import DeleteModal from './post.DeleteModal';
import UpdatePostModal from './post.UpdateModal';
import { ApiService } from '../../service/api.service';
import { UserContext } from '../../utils/context/context';
import { UserContextType } from '../../interfaces/types.userContext';
import { currentToken } from '../../service/getCurrentToken';

interface PostDetailProps {
  singlePost: PostsData | null;
  likers: [];
}

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const PostDetails: React.FC<PostDetailProps> = ({ singlePost, likers }) => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [like, setLike] = useState(true);

  const { user } = React.useContext(UserContext) as UserContextType;

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

  const addLike = async (singlePostId: number) => {
    let newLike: LikesData = {
      EmployeeId: user[0].id,
      PostId: singlePostId,
    };

    const callApi = await api.apiCreateLike(currentToken.toString(), newLike);
    console.log(callApi);
  };

  const removeLike = async (singlePostId: number) => {
    const callApi = await api.apiDeleteLike(
      currentToken.toString(),
      singlePostId.toString()
    );
    console.log(callApi);
  };

  useEffect(() => {
    const showLikeButton = () => {
      likers.forEach((liker: EmployeesData) => {
        if (liker.id === user[0].id) {
          setLike(false);
        } else {
          setLike(true);
        }
      });
    };
    showLikeButton();
  });

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
            {like ? (
              <button onClick={() => addLike(singlePost?.id!)}>Like</button>
            ) : (
              <button onClick={() => removeLike(singlePost?.id!)}>
                UnLike
              </button>
            )}
            {/*  <button onClick={() => handleLike()}>Like</button> */}
            <>{likers.length}</>
          </div>
        </div>
      )}

      {modal && deleteModal && <DeleteModal />}

      <Link to="/home">Accueil</Link>
    </section>
  );
};

export default PostDetails;

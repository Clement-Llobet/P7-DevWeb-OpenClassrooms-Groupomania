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
  const [likeCount, setLikeCount] = useState<number>(likers.length);

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

  // useEffect(() => {
  //   setLikeCount(likers.length);
  // }, [likers]);

  useEffect(() => {
    const showLikeButton = () => {
      likers.forEach((liker: EmployeesData) => {
        if (liker.id === user[0].id) {
          setLike(false);
          console.log(likers);

          setLikeCount(likers.length);
        } else {
          setLike(true);
          console.log(likers);

          // setLikeCount(likers.length);
        }
      });
    };
    showLikeButton();
  }, [likers, user]);

  const manageLike = async (singlePostId: number) => {
    let newLike: LikesData = {
      EmployeeId: user[0].id,
      PostId: singlePostId,
    };

    const callApi = await api.apiManageLike(currentToken.toString(), newLike);
    console.log(callApi);
    // setLikeCount()
  };

  // useEffect(() => {
  //   const compareId = async () => {
  //     const getUser = await api.apiGetEmployeeById(currentToken(), user.id!.toString())
  //    return
  //    }
  //    compareId();
  // })

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

      {
        // user[0].moderation === 1 || compareId(user[0]) ? (
        <div>
          {!modal && (
            <button onClick={showUpdatePostModal}>Modifier le post</button>
          )}
          {!modal && (
            <button onClick={showDeleteModal}>Supprimer le post</button>
          )}
        </div>
        // ) : null
      }

      {modal && updateModal ? (
        <UpdatePostModal
          defaultValueText={singlePost?.text}
          postId={singlePost?.id}
        />
      ) : (
        <div>
          <div>
            <p onClick={() => console.log(singlePost)}>{singlePost?.text}</p>
            {singlePost?.urlImage && <img src={singlePost?.urlImage} alt="" />}
          </div>
          <div>
            <button onClick={() => manageLike(singlePost?.id!)}>
              {like ? 'Like' : 'Unlike'}
            </button>
            <>{likeCount}</>
          </div>
        </div>
      )}

      {modal && deleteModal && <DeleteModal />}

      <Link to="/home">Accueil</Link>
    </section>
  );
};

export default PostDetails;

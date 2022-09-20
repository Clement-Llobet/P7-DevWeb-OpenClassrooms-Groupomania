import React, { useState, useContext, useEffect, Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { EmployeesData, LikesData, PostsData } from '../../interfaces';
import DeleteModal from './post.DeleteModal';
import UpdatePostModal from './post.UpdateModal';
import { ApiService } from '../../service/api.service';
import { UserContext } from '../../utils/context/context';
import { UserContextType } from '../../interfaces/types.userContext';
import { currentToken } from '../../service/getCurrentToken';
import EmptyAvatar from '../../assets/EmptyAvatar.png';
import { SinglePost, SinglePostBody } from './postStyle/PostComponentsStyle';

interface PostDetailProps {
  singlePost: PostsData;
  // likersCountSetter: Dispatch<React.SetStateAction<number>>;
  // likersCount: number;
}

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const PostDetails: React.FC<PostDetailProps> = ({
  singlePost,
  // likersCountSetter,
  // likersCount,
}) => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [like, setLike] = useState(true);

  const { user } = React.useContext(UserContext) as UserContextType;
  console.log(singlePost);

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

  // useEffect(() => {
  //   const showLikeButton = () => {
  //     likers.forEach((liker: EmployeesData) => {
  //       if (liker.id === user[0].id) {
  //         setLike(false);
  //         console.log(likers);

  //         setLikeCount(likers.length);
  //       } else {
  //         setLike(true);
  //         console.log(likers);

  //         // setLikeCount(likers.length);
  //       }
  //     });
  //   };
  //   showLikeButton();
  // }, [likers, user]);

  const manageLike = async (singlePost: PostsData) => {
    let newLike: LikesData = {
      EmployeeId: user[0].id,
      PostId: singlePost.id!,
    };

    const response = await api.apiManageLike(currentToken.toString(), newLike);
    // console.log(response.postIdFound);
    const callApi = await api.apiGetPostById(
      currentToken(),
      response.postIdFound
    );
    // console.log(callApi);

    // likersCountSetter()
  };

  return (
    <SinglePostBody>
      <SinglePost>
        <div className="post-detail__header">
          <div className="post-detail__profile-infos">
            <div className="post-detail__avatar">
              {singlePost?.author.profilePicture ? (
                <img src={singlePost?.author.profilePicture} alt="avatar" />
              ) : (
                <img src={EmptyAvatar} alt="avatar" />
              )}
              <div className="post-detail__name-and-surname">
                <p>{singlePost?.author.surname}</p>
                <p>{singlePost?.author.name}</p>
              </div>
            </div>
          </div>

          {user[0].moderation === 1 || singlePost?.author.id === user[0].id ? (
            <div>
              {!modal ? (
                <div>
                  <button onClick={showUpdatePostModal}>
                    Modifier le post
                  </button>
                  <button onClick={showDeleteModal}>Supprimer le post</button>
                </div>
              ) : updateModal ? (
                <button
                  onClick={() => {
                    setUpdateModal(false);
                    setModal(false);
                  }}
                >
                  Fermer
                </button>
              ) : (
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
          ) : null}
        </div>

        {modal && updateModal ? (
          <UpdatePostModal
            defaultValueText={singlePost?.text}
            postId={singlePost?.id}
          />
        ) : (
          <div>
            <div className="post-detail__content">
              <p>{singlePost?.text}</p>
              {singlePost?.urlImage && (
                <img src={singlePost?.urlImage} alt="" />
              )}
            </div>
            <div>
              <button onClick={() => manageLike(singlePost!)}>
                {like ? 'Like' : 'Unlike'}
              </button>
              <>
                {
                  // likersCount
                }
              </>
            </div>
          </div>
        )}

        {modal && deleteModal && <DeleteModal />}
      </SinglePost>
    </SinglePostBody>
  );
};

export default PostDetails;

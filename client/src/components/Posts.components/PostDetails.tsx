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
  post: PostsData;
}

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const PostDetails: React.FC<PostDetailProps> = ({ post }) => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [like, setLike] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number>(post.likers!.length);

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

  useEffect(() => {
    const manageLikeButtonName = (post?: PostsData) => {
      if (post!.likers?.length === 0) {
        setLike(true);
      } else {
        post!.likers?.forEach(async (liker) => {
          if (user[0].id === liker.id) {
            setLike(false);
          } else {
            setLike(true);
          }
        });
      }
    };
    manageLikeButtonName(post);
  }, [post, user]);

  const manageLike = async (singlePost: PostsData) => {
    let likeOrder: LikesData = {
      EmployeeId: user[0].id,
      PostId: singlePost.id!,
    };

    await api.apiManageLike(currentToken.toString(), likeOrder);

    if (like === true) {
      setLike(false);
      setLikeCount(likeCount + 1);
    } else {
      setLike(true);
      setLikeCount(likeCount - 1);
    }
  };

  return (
    <SinglePostBody>
      <SinglePost>
        <div className="post-detail__header">
          <div className="post-detail__profile-infos">
            <div className="post-detail__avatar">
              {post.author.profilePicture ? (
                <img src={post.author.profilePicture} alt="avatar" />
              ) : (
                <img src={EmptyAvatar} alt="avatar" />
              )}
              <div className="post-detail__name-and-surname">
                <p>{post.author.surname}</p>
                <p>{post.author.name}</p>
              </div>
            </div>
          </div>

          {user[0].moderation === 1 || post.author.id === user[0].id ? (
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
          <UpdatePostModal defaultValueText={post.text} postId={post.id} />
        ) : (
          <div>
            <div className="post-detail__content">
              <p>{post.text}</p>
              {post.urlImage && <img src={post.urlImage} alt="" />}
            </div>
            <div>
              <button onClick={() => manageLike(post!)}>
                {like ? 'Like' : 'Unlike'}
              </button>
              <>{likeCount}</>
            </div>
          </div>
        )}

        {modal && deleteModal && <DeleteModal />}
      </SinglePost>
    </SinglePostBody>
  );
};

export default PostDetails;

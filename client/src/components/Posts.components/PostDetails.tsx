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

const api = new ApiService('http://localhost:8000/');

const PostDetails: React.FC<PostDetailProps> = ({ post }) => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [like, setLike] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number>(post.likers!.length);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [text, setText] = useState<string>(post.text!);
  const [image, setImage] = useState<string>(post.urlImage!);

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

  useEffect(() => {
    const updateContent = async () => {
      await api.apiGetPostById(currentToken(), post.id!.toString());
    };
    updateContent();
  }, [text, image, post.id]);

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
            <div className="post-detail__action">
              {!modal ? (
                <div className="post-detail__action__buttons">
                  <button onClick={showUpdatePostModal}>
                    Modifier le post
                  </button>
                  <button onClick={showDeleteModal}>Supprimer le post</button>
                </div>
              ) : updateModal ? (
                <button
                  className="close-modal"
                  onClick={() => {
                    setUpdateModal(false);
                    setModal(false);
                  }}
                >
                  Fermer
                </button>
              ) : (
                <button
                  className="close-modal"
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
        <hr />

        {modal ? (
          updateModal ? (
            <UpdatePostModal
              postId={post.id}
              modalSetter={setModal}
              text={text}
              textSetter={setText}
              image={image}
              imageSetter={setImage}
              successMessage={successMessage}
              successMessageSetter={setSuccessMessage}
            />
          ) : (
            deleteModal && <DeleteModal />
          )
        ) : (
          <div>
            <div className="post-detail__content">
              <p>{text}</p>
              {image && <img src={image} alt="post img" />}
            </div>
            <div className="post-detail__likes">
              <button onClick={() => manageLike(post!)}>
                {like ? 'Like' : 'Unlike'}
              </button>
              <p>{likeCount}</p>
            </div>
          </div>
        )}
      </SinglePost>
    </SinglePostBody>
  );
};

export default PostDetails;

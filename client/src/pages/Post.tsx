import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from '../components/Posts.components/PostDetails';
import { PostsData } from '../interfaces';
import { ApiService } from '../service/api.service';
import DeleteModal from '../components/Posts.components/post.DeleteModal';
import UpdatePostModal from '../components/Posts.components/post.UpdateModal';

type PostParams = {
  id: string;
};

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Post = () => {
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
      <p onClick={showUpdatePostModal}>Modifier le post</p>
      <p onClick={showDeleteModal}>Supprimer le post</p>
      {updateModal && <UpdatePostModal />}
      {deleteModal && <DeleteModal />}
    </div>
  );
  // const { id } = useParams<PostParams>();
  // const [singlePost, setSinglePost] = useState<PostsData | null>(null);
  // useEffect(() => {
  //   const getSinglePost = async () => {
  //     const response = await fetch(
  //       `https://jsonplaceholder.typicode.com/posts/${id}`
  //     );
  //     const data: PostsData = await response.json();
  //     setSinglePost(data);
  //   };
  //   getSinglePost();
  // }, [id]);
  // return <PostDetail singlePost={singlePost} />;
};

export default Post;

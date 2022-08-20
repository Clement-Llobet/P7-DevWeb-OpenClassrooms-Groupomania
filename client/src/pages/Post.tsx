import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../components/Posts.components/PostDetails';
import { PostsData } from '../interfaces';
import { ApiService } from '../service/api.service';

type PostParams = {
  id: string;
};

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Post = () => {
  const { id } = useParams<PostParams>();
  const [singlePost, setSinglePost] = useState<PostsData | null>(null);
  useEffect(() => {
    const getSinglePost = async () => {
      const data = await api.apiGetPostById(id);
      setSinglePost(data);
    };
    getSinglePost();
  }, [id]);
  return <PostDetails singlePost={singlePost} />;
};

export default Post;

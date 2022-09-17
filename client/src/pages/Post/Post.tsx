import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PostDetails from '../../components/Posts.components/PostDetails';
import { PostsData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { forbidAccessWithoutToken } from '../../service/access.service';
import { currentToken } from '../../service/getCurrentToken';
import { PostIdParams } from '../../types/types';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Post = () => {
  const { id } = useParams<PostIdParams>();
  const { state } = useLocation();

  const [singlePost, setSinglePost] = useState<PostsData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithoutToken(navigate);
  });

  useEffect(() => {
    const getSinglePost = async () => {
      const data = await api.apiGetPostById(currentToken(), id);
      setSinglePost(data);
    };
    getSinglePost();
  }, [id]);
  return <PostDetails singlePost={singlePost} likers={state as []} />;
};

export default Post;

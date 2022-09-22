import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PostDetails from '../../components/Posts.components/PostDetails';
import { PostsData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { forbidAccessWithoutToken } from '../../service/access.service';
import { currentToken } from '../../service/getCurrentToken';
import { PostIdParams } from '../../types/types';
import Header from '../../components/Header/Header';
import { UserContext } from '../../utils/context/context';
import { UserContextType } from '../../interfaces/types.userContext';
import { PostBody } from './PostStyle';

const api = new ApiService('http://localhost:8000/');

const Post = () => {
  const { id } = useParams<PostIdParams>();
  const { state } = useLocation();

  const { user } = React.useContext(UserContext) as UserContextType;

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

  return (
    <PostBody>
      <Header moderationRight={user[0] && user[0].moderation} />
      <PostDetails post={state as PostsData} />
    </PostBody>
  );
};

export default Post;

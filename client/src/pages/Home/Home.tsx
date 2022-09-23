import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PostsList from '../../components/Posts.components/PostsList';
import { useEffect, useState } from 'react';
import { PostsData } from '../../interfaces/index';
import { ApiService } from '../../service/api.service';
import { useNavigate } from 'react-router-dom';
import { forbidAccessWithoutToken } from '../../service/access.service';
import CreatePostModal from '../../components/Posts.components/post.createModal';
import { currentToken } from '../../service/getCurrentToken';
import React from 'react';
import { UserContext } from '../../utils/context/context';
import { UserContextType } from '../../interfaces/types.userContext';
import { HomeMain, PostContainer, CreatePost } from './HomeStyle';

const api = new ApiService('http://localhost:8000/');

const Home: React.FC = () => {
  const [allPosts, setAllPosts] = useState<PostsData[] | null>(null);
  const [createPost, setCreatePost] = useState<boolean>(false);

  const { user } = React.useContext(UserContext) as UserContextType;

  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithoutToken(navigate);
  }, [navigate]);

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await api.apiGetAllPosts(currentToken());
      setAllPosts(data);
    };
    if (allPosts === null) {
      getAllPosts();
    }
  }, [allPosts]);

  return (
    <HomeMain>
      <Header moderationRight={user[0] && user[0].moderation} />
      <PostContainer>
        <h1>Communiquez</h1>

        <h2>Les derniers posts des Groupomaniens</h2>
        <CreatePost>
          {createPost ? (
            <CreatePostModal
              postSetter={setAllPosts}
              createPostSetter={setCreatePost}
            />
          ) : (
            <button className="create-post" onClick={() => setCreatePost(true)}>
              Créez le vôtre !
            </button>
          )}
        </CreatePost>

        <PostsList
          allPosts={allPosts}
          moderationRight={user[0] && user[0].moderation}
        />
      </PostContainer>
      <Footer />
    </HomeMain>
  );
};

export default Home;

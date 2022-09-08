import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PostsList from '../../components/Posts.components/PostsList';
import { useEffect, useState } from 'react';
import { PostsData } from '../../interfaces/index';
import { ApiService } from '../../service/api.service';
import { useNavigate } from 'react-router-dom';
import {
  forbidAccessWithoutModerationRight,
  forbidAccessWithoutToken,
} from '../../service/access.service';
import CreatePostModal from '../../components/Posts.components/post.createModal';
import { currentToken } from '../../service/getCurrentToken';
import React from 'react';
import { UserContext } from '../../utils/context/context';
import { UserContextType } from '../../interfaces/types.userContext';
import { HomeMain } from './HomeStyle';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Home: React.FC = () => {
  const [allPosts, setAllPosts] = useState<PostsData[] | null>(null);
  const [createPost, setCreatePost] = useState<boolean>(false);

  const { user } = React.useContext(UserContext) as UserContextType;

  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithoutToken(navigate);
  });

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
      <section className="post-container">
        <h2>Communiquez.</h2>

        <button onClick={() => setCreatePost(true)}>Créer un post</button>
        {createPost && (
          <div>
            <CreatePostModal />
            <button onClick={() => setCreatePost(false)}>Annuler</button>
          </div>
        )}

        <h2>Les derniers posts des Groupomaniens</h2>
        <PostsList
          allPosts={allPosts}
          moderationRight={user[0] && user[0].moderation}
        />
      </section>
      <Footer />
    </HomeMain>
  );
};

export default Home;
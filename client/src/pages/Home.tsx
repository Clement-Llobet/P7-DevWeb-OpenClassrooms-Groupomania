import Header from '../components/Header';
import Footer from '../components/Footer';
import PostsList from '../components/Posts.components/PostsList';
import { useEffect, useState } from 'react';
import { PostsData } from '../interfaces/index';
import { ApiService } from '../service/api.service';
import { useNavigate } from 'react-router-dom';
import { forbidAccessWithoutToken } from '../service/access.service';
import CreatePostModal from '../components/Posts.components/post.createModal';
import { currentToken } from '../service/getCurrentToken';
import { UserContext } from '../utils/context';
import { UserContextType } from '../interfaces/types.userContext';
import React from 'react';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Home: React.FC = () => {
  const [allPosts, setAllPosts] = useState<PostsData[] | null>(null);
  const [postCount, setPostCount] = useState<number>();
  const [createPost, setCreatePost] = useState<boolean>(false);

  const { user, saveUser } = React.useContext(UserContext) as UserContextType;

  // console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithoutToken(navigate);
  });

  // const postCountOrigin = () => localStorage.getItem('number') || postCount;
  // const getPostCount = postCountOrigin();

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await api.apiGetAllPosts(currentToken());
      setAllPosts(data);
    };
    getAllPosts();
  }, []);

  // const setPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPostCount(+e.target.value);
  //   localStorage.setItem('number', e.target.value);
  // };

  return (
    <main>
      <Header />
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
        <PostsList allPosts={allPosts} />
      </section>
      <Footer />
    </main>
  );
};

export default Home;

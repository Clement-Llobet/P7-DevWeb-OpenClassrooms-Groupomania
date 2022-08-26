import Header from '../components/Header';
import Footer from '../components/Footer';
import PostsList from '../components/Posts.components/PostsList';
import { useEffect, useState } from 'react';
import { PostsData } from '../interfaces/index';
import { ApiService } from '../service/api.service';
import { useNavigate } from 'react-router-dom';
import { forbidAccessWithoutToken } from '../service/checkLocalStorage';
import CreatePostModal from '../components/Posts.components/post.createModal';
import { currentToken } from '../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Home: React.FC = () => {
  const [allPosts, setAllPosts] = useState<PostsData[] | null>(null);
  const [postCount, setPostCount] = useState<number>();
  const [createPost, setCreatePost] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithoutToken(navigate);
  });

  const postCountOrigin = () => localStorage.getItem('number') || postCount;
  const getPostCount = postCountOrigin();

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await api.apiGetAllPosts(currentToken());
      setAllPosts(data);
    };
    getAllPosts();
  }, [getPostCount]);

  const setPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostCount(+e.target.value);
    localStorage.setItem('number', e.target.value);
  };

  return (
    <main>
      <Header />
      <section className="post-container">
        <h1>Communiquez.</h1>

        <button onClick={() => setCreatePost(true)}>Créer un post</button>
        {createPost && (
          <div>
            <CreatePostModal />
            <button onClick={() => setCreatePost(false)}>Annuler</button>
          </div>
        )}

        <p>Derniers posts publiés</p>
        <input
          type="range"
          min={1}
          max={20}
          onChange={setPosts}
          defaultValue={getPostCount}
        />
        <h2>{getPostCount} posts</h2>
        <PostsList allPosts={allPosts} />
      </section>
      <Footer />
    </main>
  );
};

export default Home;

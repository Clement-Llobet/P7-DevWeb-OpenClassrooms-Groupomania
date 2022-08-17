import Header from '../components/Header';
import Footer from '../components/Footer';
import PostsList from '../components/PostsList';
import { useEffect, useState } from 'react';
import { PostsData } from '../interfaces';
import { ApiService } from '../service/api.service';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Home: React.FC = () => {
  const [allPosts, setAllPosts] = useState<PostsData[] | null>(null);
  const [postCount, setPostCount] = useState<number>();

  const postCountOrigin = () => localStorage.getItem('number') || postCount;
  const getPostCount = postCountOrigin();

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await api.apiGetAllPosts();
      setAllPosts(data);
    };
    getAllPosts();
  }, [getPostCount]);

  const setPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostCount(+e.target.value);
    localStorage.setItem('number', e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="post-container">
        <h1>Communiquez.</h1>
        <input
          type="range"
          min={1}
          max={20}
          onChange={setPosts}
          defaultValue={getPostCount}
        />
        <h2>{getPostCount} posts</h2>
        <PostsList allPosts={allPosts} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import Header from '../components/Header';
import Footer from '../components/Footer';
import PostsList from '../components/PostsList';
import { useEffect, useState } from 'react';
import { PostsData } from '../interfaces';
// import { getAllPosts } from '../service/api.service.posts';

const Home: React.FC = () => {
  const [allPosts, setAllPosts] = useState<PostsData[] | null>(null);
  const [postCount, setPostCount] = useState<number>(5);

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${postCount}`
      );
      const data: PostsData[] = await response.json();
      setAllPosts(data);
    };
    getAllPosts();
  }, [postCount]);

  const setPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostCount(+e.target.value);
    localStorage.setItem('number', e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="post-container">
        <h1>Communiquez.</h1>
        <input type="range" min={1} max={20} onChange={setPosts} />
        <h2>{postCount} posts</h2>
        <PostsList allPosts={allPosts} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

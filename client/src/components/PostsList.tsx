import { useNavigate } from 'react-router-dom';
import { PostsData } from '../interfaces';

interface PostsListProps {
  allPosts: PostsData[] | null;
}

const PostsList: React.FC<PostsListProps> = ({ allPosts }) => {
  const navigate = useNavigate();

  return (
    <ul className="Posts">
      {allPosts?.map((post) => (
        <li key={post.id} onClick={() => navigate(`/${post.id}`)}>
          <h2>{post.title}</h2>
          <p>Lire la suite…</p>
        </li>
      ))}
    </ul>
  );
};

export default PostsList;

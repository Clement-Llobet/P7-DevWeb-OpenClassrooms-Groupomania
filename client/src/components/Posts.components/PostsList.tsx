import { useNavigate } from 'react-router-dom';
import { PostsData } from '../../interfaces';

interface PostsListProps {
  allPosts: PostsData[] | null;
}

const PostsList: React.FC<PostsListProps> = ({ allPosts }) => {
  const navigate = useNavigate();

  return (
    <ul className="Posts">
      {allPosts?.map((post) => (
        <li key={post.id} onClick={() => navigate(`/${post.id}`)}>
          <p>{post.text}</p>
          <img src={post.urlImage} alt="" />
        </li>
      ))}
    </ul>
  );
};

export default PostsList;

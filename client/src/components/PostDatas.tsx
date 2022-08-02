import { Link } from 'react-router-dom';
import { PostsData } from '../interfaces';

interface PostDetailProps {
  singlePost: PostsData | null;
}

const PostDetail: React.FC<PostDetailProps> = ({ singlePost }) => {
  return (
    <div>
      <h1>Post n°{singlePost?.id}</h1>
      <p>{singlePost?.text}</p>
      <img src={singlePost?.urlImage} alt="" />

      <Link to="/home">Accueil</Link>
    </div>
  );
};

export default PostDetail;

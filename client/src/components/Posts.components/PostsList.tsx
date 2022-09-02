import { useNavigate } from 'react-router-dom';
import { PostsData } from '../../interfaces';

interface PostsListProps {
  allPosts: PostsData[] | null;
}

const PostsList: React.FC<PostsListProps> = ({ allPosts }) => {
  const navigate = useNavigate();

  return (
    <ul className="Posts">
      {allPosts
        ?.reverse()
        .map((post) => (
          <li key={post!.id} onClick={() => navigate(`/${post!.id}`)}>
            <h3>
              {post.profilePicture && post.profilePicture}
              {post.author?.surname} {post.author?.name}
            </h3>
            <>Date : {post.author?.createdAt}</>
            <p>{post.text}</p>
            {/* <img src={post.urlImage} alt="" /> */}
            <>
              <button>
                Like
                {/* {isAlreadyLiked ? "UnLike" : "Like"} */}
              </button>
              <p>{post.likers!.length}</p>
            </>
          </li>
        ))
        .reverse()}
    </ul>
  );
};

export default PostsList;

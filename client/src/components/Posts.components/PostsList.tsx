import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostsData } from '../../interfaces';
import { UserContextType } from '../../interfaces/types.userContext';
import { UserContext } from '../../utils/context/context';

interface PostsListProps {
  allPosts: PostsData[] | null;
}

const PostsList: React.FC<PostsListProps> = ({ allPosts }) => {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext) as UserContextType;

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
            <>
              {/* {post?.likers?.forEach((likers) => {
                console.log(likers.id);
              })} */}
            </>

            {/* <img src={post.urlImage} alt="" /> */}
            <>
              <button>
                Like
                {}
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

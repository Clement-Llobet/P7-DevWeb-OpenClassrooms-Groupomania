import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostsData } from '../../interfaces';
import { UserContextType } from '../../interfaces/types.userContext';
import { UserContext } from '../../utils/context/context';
import DeleteModal from './post.DeleteModal';
import { PostLi, PostUl } from './postStyle/PostStyle';

interface PostsListProps {
  allPosts: PostsData[] | null;
  moderationRight: number | null;
}

const PostsList: React.FC<PostsListProps> = ({ allPosts, moderationRight }) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div>
      <PostUl className="Posts">
        {allPosts
          ?.reverse()
          .map((post) => (
            <PostLi
              key={post!.id}
              onClick={() => navigate(`/${post!.id}`, { state: post.likers })}
            >
              <div>
                <h3>
                  {post.profilePicture && post.profilePicture}
                  {post.author?.surname} {post.author?.name}
                </h3>
                <>Date : {post.author?.createdAt}</>
              </div>
              <p>{post.text}</p>
              <>
                {/* {post?.likers?.forEach((likers) => {
                console.log(likers.id);
              })} */}
              </>

              {/* <img src={post.urlImage} alt="" /> */}
              <>
                <p>Likes : {post.likers!.length}</p>
              </>
            </PostLi>
          ))
          .reverse()}
      </PostUl>
      {deleteModal && <DeleteModal />}
    </div>
  );
};

export default PostsList;

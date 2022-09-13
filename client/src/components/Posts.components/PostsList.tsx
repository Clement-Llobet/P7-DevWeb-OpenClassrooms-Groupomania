import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostsData } from '../../interfaces';
import DeleteModal from './post.DeleteModal';
import { PostLi, PostUl } from './postStyle/PostComponentsStyle';
import EmptyAvatar from '../../assets/EmptyAvatar.png';

interface PostsListProps {
  allPosts: PostsData[] | null;
  moderationRight: number | null;
}

const PostsList: React.FC<PostsListProps> = ({ allPosts, moderationRight }) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const formatDate = (date: string) => {
    console.log(typeof date);
    date.slice(0, 10);
    console.log(date);

    // .split('-');
    // console.log(date);
    // return date;
  };

  return (
    <div>
      <PostUl className="Posts">
        {allPosts
          ?.map((post) => (
            <PostLi
              key={post!.id}
              onClick={() => navigate(`/${post!.id}`, { state: post.likers })}
            >
              <div className="li-header">
                {post.author?.urlImage ? (
                  <img src={`${post.author.urlImage}`} alt="profil" />
                ) : (
                  <img src={EmptyAvatar} alt="profil" />
                )}
                <div>
                  <h3>
                    {post.author?.surname} {post.author?.name}
                  </h3>
                  <p>
                    {post.author
                      ?.createdAt!.slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('/')}
                  </p>
                </div>
              </div>
              <p>{post.text}</p>
              {post.urlImage && (
                <img className="post-picture" src={post.urlImage} alt="Post" />
              )}
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

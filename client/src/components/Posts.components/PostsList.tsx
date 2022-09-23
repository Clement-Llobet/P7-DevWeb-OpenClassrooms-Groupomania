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
  const navigate = useNavigate();

  return (
    <div>
      <PostUl className="Posts">
        {allPosts
          ?.map(
            (post) =>
              post.author !== null && (
                <PostLi
                  key={post!.id}
                  onClick={() => navigate(`/${post!.id}`, { state: post })}
                >
                  <div className="li-header">
                    {post.author?.profilePicture ? (
                      <img src={post.author!.profilePicture} alt="profil" />
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
                  <div>
                    <p>{post.text}</p>
                    {post.urlImage && (
                      <img
                        className="post-picture"
                        src={post.urlImage}
                        alt="Post"
                      />
                    )}
                  </div>

                  <>
                    <p>Likes : {post.likers!.length}</p>
                  </>
                </PostLi>
              )
          )
          .reverse()}
      </PostUl>
    </div>
  );
};

export default PostsList;

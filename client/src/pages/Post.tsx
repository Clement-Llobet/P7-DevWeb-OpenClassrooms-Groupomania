import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from '../components/PostDatas';
import { PostsData } from '../interfaces';

type PostParams = {
  id: string;
};

const Post = () => {
  const { id } = useParams<PostParams>();
  const [singlePost, setSinglePost] = useState<PostsData | null>(null);

  useEffect(() => {
    const getSinglePost = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data: PostsData = await response.json();
      setSinglePost(data);
    };
    getSinglePost();
  }, [id]);

  return <PostDetail singlePost={singlePost} />;
};

export default Post;

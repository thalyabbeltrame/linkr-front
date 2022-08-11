import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

import { useAuth } from '../../contexts/auth';
import { usePosts } from '../../contexts/posts';
import { getTimelineRequest } from '../../services/apiRequests';
import Post from './Post';

export default function Posts() {
  const { logout } = useAuth();
  const { posts, setPosts } = usePosts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = (error) =>
    error.response.status === 401 ? logout() : setError(true);

  useEffect(() => {
    getTimelineRequest()
      .then(({ data }) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        handleError(err);
      });
  }, [posts]);

  const renderPosts = () => {
    if (posts.length === 0) return <p>There are no posts yet</p>;
    return posts.map((post) => (
      <Post
        key={post.id}
        avatar={post.avatar}
        username={post.username}
        text={post.text}
        title={post.title}
        description={post.description}
        link={post.link}
        image={post.image}
      />
    ));
  };

  const renderContent = () => {
    if (loading)
      return (
        <TailSpin
          wrapperClass='spinner'
          height='80'
          width='80'
          color='#1877F2'
        />
      );
    if (error)
      return (
        <p className='error-message'>
          An error occured while trying to fetch the posts, please refresh the
          page
        </p>
      );
    return renderPosts();
  };

  return <PostsContainer>{renderContent()}</PostsContainer>;
}

const PostsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  .spinner {
    margin-top: 50px;
  }

  .error-message {
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #ff0000;
  }
`;

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getTimelineRequest } from '../../services/apiRequests';
import Post from './Post';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTimelineRequest()
      .then(({ data }) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

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
    if (loading) return <p>Loading...</p>;
    if (error)
      return (
        <p>
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
  justify-content: center;
  align-items: center;
  width: 100%;
`;

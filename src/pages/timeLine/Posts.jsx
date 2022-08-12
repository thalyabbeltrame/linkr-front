import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

import Post from '../../components/post/Post';

export default function Posts({ dataPosts, error, loading }) {
   
  const renderPosts = () => {
    if (dataPosts.length === 0)
      return <p className=''>There are no posts yet</p>;
    return dataPosts.map((post) => (
      <Post
        id={post.id}
        key={post.id}
        avatar={post.avatar}
        username={post.username}
        text={post.text}
        title={post.title}
        description={post.description}
        link={post.link}
        image={post.image}
        likes={post.likes}
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

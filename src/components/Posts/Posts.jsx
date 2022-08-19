import { useEffect, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import InfiniteScroll from 'react-infinite-scroller';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';
import useInterval from 'use-interval';

import { useAuth } from '../../providers/AuthProvider';
import { usePosts } from '../../providers/PostsProvider';
import {
  getNewPostsRequest,
  getPostOfSigleUserByIdRequest,
  getPostsByHashtagRequest,
  getTimelineRequest,
} from '../../services/apiRequests';
import { Post } from './Post';

export const Posts = ({ userId, hashtag }) => {
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [dataPosts, setDataPosts] = useState([]);
  const [numberOfNewPosts, setNumberOfNewPosts] = useState(0);
  const [page, setPage] = useState(1);
  const { hasUpdate, setHasUpdate, status, setStatus } = usePosts();
  const { logout } = useAuth();

  useEffect(() => {
    setDataPosts([]);
    setPage(1);
    setHasMore(true);
  }, [hasUpdate, userId, hashtag]);

  useInterval(async () => {
    try {
      if (!!userId || !!hashtag || dataPosts.length === 0) return;
      const response = await getNewPostsRequest(dataPosts[0]?.created_at);
      setNumberOfNewPosts(response.data);
    } catch (err) {
      let message = err.response.data;
      if (message === 'Unauthorized') {
        return logout();
      }
    }
  }, 15000);

  const getPosts = async () => {
    try {
      if (!!userId) {
        const { data, status } = await getPostOfSigleUserByIdRequest(
          userId,
          page
        );
        return { data: data.posts, status };
      } else if (!!hashtag) {
        const { data, status } = await getPostsByHashtagRequest(hashtag, page);
        return { data, status };
      } else {
        const { data, status } = await getTimelineRequest(page);
        return { data, status };
      }
    } catch (err) {
      console.log(err);
      let message = err.response.data;
      if (message === 'Unauthorized') {
        return logout();
      }
    }
  };
  const handleLoader = async () => {
    try {
      const { data, status } = await getPosts();
      setStatus(status);
      if (data.length > 0) {
        setDataPosts([...dataPosts, ...data]);
      }
      if (data.length === 0 || data.length < 10) {
        setHasMore(false);
      }
      setPage(page + 1);
    } catch (err) {
      let message = err.response.data;
      if (message === 'Unauthorized') {
        return logout();
      }
    }
  };

  const handleUpdate = () => {
    setNumberOfNewPosts(0);
    setHasUpdate(!hasUpdate);
  };

  const renderContent = () => {
    if (error) {
      return (
        <p className='error-message'>
          An error occured while trying to fetch the posts, please refresh the
          page
        </p>
      );
    }
    if (dataPosts.length === 0) {
      switch (status) {
        case 205:
          return (
            <p p className='no-posts'>
              {' '}
              You don't follow anyone yet. Search for new friends!
            </p>
          );
        case 210:
          return <p className='no-posts'>No posts found from your friends</p>;
        default:
          return <p className='no-posts'>There are no posts yet</p>;
      }
    }
    return dataPosts.map((post) => (
      <Post key={post.id + Math.random()} {...post} />
    ));
  };

  return (
    <PostsContainer>
      {
        <>
          {numberOfNewPosts ? (
            <NewPostsButton onClick={handleUpdate}>
              <p>{numberOfNewPosts} new posts, load more!</p>
              <BiRefresh
                style={{
                  color: '#fff',
                  width: '30px',
                  height: '30px',
                  marginLeft: '10px',
                }}
              />
            </NewPostsButton>
          ) : null}
        </>
      }
      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoader}
        hasMore={hasMore}
        loader={
          <div
            key={0}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <TailSpin
              height='50'
              width='50'
              color='#6D6D6D'
              ariaLabel='tail-spin-loading'
              radius='0'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
            <h1 className='loading-text'>Loading more posts...</h1>
          </div>
        }
        useWindow={true}
      >
        {renderContent()}
      </InfiniteScroll>
    </PostsContainer>
  );
};

const PostsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  .spinner {
    margin-top: 50px;
  }

  .loading-text {
    font-size: 22px;
    color: #6d6d6d;
    margin-top: 40px;
    margin-bottom: 100px;
  }

  .error-message {
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #ff0000;
  }

  .no-posts {
    color: white;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
  }
`;

const NewPostsButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 61px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  border: none;
  margin-bottom: 17px;
  cursor: pointer;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`;

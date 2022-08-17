import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Header } from '../components/Header/Header';
import { InputSearch } from '../components/Header/InputSearch';
import { Posts } from '../components/Posts/Posts';
import { Publish } from '../components/Publish/Publish';
import { HashTags } from '../components/Trending/HashTags';
import { useAuth } from '../providers/AuthProvider';
import { usePosts } from '../providers/PostsProvider';
import { getTimelineRequest } from '../services/apiRequests.js';

export const TimelinePage = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const [error, setError] = useState(false);
  const { dataPosts, setDataPosts, hasUpdate, status, setStatus } = usePosts();

  useEffect(() => {
    getTimelineRequest()
      .then(({ data, status }) => {
        setDataPosts(data);
        setLoading(false);
        setStatus(status)
      })
      .catch((error) => {
        setLoading(false);
        handleError(error);
      });
  }, [hasUpdate]);

  const handleError = (error) =>
    error.response.status === 401 ? logout() : setError(true);
  return (
    <>
      <Header />
      <MainContainer>
        <Content>
          <span className='mobile'>
            <InputSearch widthProps={'95vw'} />
          </span>
          <Title>timeline</Title>
          <Publish />
          <Posts
            dataPosts={dataPosts}
            error={error}
            loading={loading}
            setDataPosts={setDataPosts}
            status={status}
          />
        </Content>
        <HashTags />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;

  @media screen and (max-width: 768px) {
    padding-left: 0;
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  max-width: 611px;
  width: 100%;
  margin-top: 125px;
  .mobile {
    display: none;
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
    margin-top: 91px;
    .mobile{
      display: block;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  margin-bottom: 43px;

  @media screen and (max-width: 768px) {
    margin-bottom: 19px;
    padding: 0 17px;
    font-size: 33px;
  }
`;

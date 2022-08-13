import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../components/header/Header';
import { HashTag } from '../../components/trending/HashTags';
import { useAuth } from '../../providers/auth';
import { usePosts } from '../../providers/posts';
import { getPostsByHashtag } from '../../services/apiRequests';
import Posts from '../timeLine/Posts';

export const HashtagPage = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const [error, setError] = useState(false);
  const { dataPosts, setDataPosts, hasUpdate } = usePosts();
  const { hashtag } = useParams();

  useEffect(() => {
    getPostsByHashtag(hashtag)
      .then(({ data }) => {
        setDataPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        handleError(err);
      });
  }, [hasUpdate, hashtag]);

  const handleError = (error) =>
    error.response.status === 401 ? logout() : setError(true);

  return (
    <>
      <Header />
      <MainContainer>
        <Content>
          <Title>{`# ${hashtag}`}</Title>
          <Posts dataPosts={dataPosts} error={error} loading={loading} />
          <HashTag />
        </Content>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
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

  @media screen and (max-width: 768px) {
    max-width: 100%;
    margin-top: 91px;
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
  }
`;

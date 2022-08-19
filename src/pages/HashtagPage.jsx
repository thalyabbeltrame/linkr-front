import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Header } from '../components/Header/Header';
import { Posts } from '../components/Posts/Posts';
import { HashTags } from '../components/Trending/HashTags';

export const HashtagPage = () => {
  const { hashtag } = useParams();

  return (
    <>
      <Header />
      <MainContainer>
        <Content>
          <Title>{`# ${hashtag}`}</Title>
          <Posts hashtag={hashtag} />
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

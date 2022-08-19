import { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header/Header';
import { InputSearch } from '../components/Header/InputSearch';
import { Posts } from '../components/Posts/Posts';
import { Publish } from '../components/Publish/Publish';
import { HashTags } from '../components/Trending/HashTags';
import { getTimelineRequest } from '../services/apiRequests.js';

export const TimelinePage = () => {
  
  const [error, setError] = useState(false);


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
            error={error}
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

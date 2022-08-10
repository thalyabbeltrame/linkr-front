import React from 'react';
import styled from 'styled-components';

import Header from '../../shared/components/Header';
import Publish from './Publish';
import Posts from './Posts';

export const TimeLine = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Content>
          <Title>timeline</Title>
          <Publish />
          <Posts />
        </Content>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 611px;
  margin-top: 125px;

  @media screen and (max-width: 768px) {
    max-width: 100%;
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
    padding: 0 17px;
    margin-bottom: 19px;
  }
`;

import React from 'react'
import PublishComponent from '../components/PublishComponent.jsx';
import styled from 'styled-components';
import Header from '../components/Header.jsx';

export const TimeLine = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Content>
          <Title>timeline</Title>
          <PublishComponent />
        </Content>
      </MainContainer>
    </>
  )
};

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    width: 70%;
`;
const MainContainer = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    background-color: #373434;

    @media screen and (max-width: 768px) {
        align-items: flex-start;
        padding-left: 0;
    }
`;
const Title = styled.div`
      width: 100%;
      padding-left: 5%;
      font-family: 'Oswald';
      font-style: normal;
      font-weight: 700;
      font-size: 43px;
      line-height: 64px;
      color: #FFFFFF;
      position: relative;
`
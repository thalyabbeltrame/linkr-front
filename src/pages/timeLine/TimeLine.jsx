import React from 'react';
import styled from 'styled-components';
import { PublishComponent } from './PublishComponent';
import Header from '../../shared/components/Header';
import Posts from './Posts';

export const TimeLine = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Content>
          <Title>timeline</Title>
          <PublishComponent />
          <Posts />
        </Content>
      </MainContainer>
    </>
  );
};
const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 611px;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
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
        width: 100%;
    }
`;
const Title = styled.div`
      width: 100%;
      font-family: 'Oswald';
      font-style: normal;
      font-weight: 700;
      font-size: 43px;
      line-height: 64px;
      color: #FFFFFF;
      position: relative;
      margin-bottom: 2.0rem;
`
// =======
// const MainContainer = styled.main`
//   display: flex;
//   justify-content: center;
//   height: 100vh;
// `;

// const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   max-width: 611px;
//   margin-top: 125px;

//   @media screen and (max-width: 768px) {
//     max-width: 100%;
//   }
// `;
// const Title = styled.div`
//   width: 100%;
//   font-family: 'Oswald';
//   font-weight: 700;
//   font-size: 43px;
//   line-height: 64px;
//   color: #ffffff;
//   margin-bottom: 43px;

//   @media screen and (max-width: 768px) {
//     padding: 0 17px;
//     margin-bottom: 19px;
//   }
// `;
// >>>>>>> 3ac8d320ae1a3a579100a60241519fb790df1550

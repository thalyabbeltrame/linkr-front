import { useState } from 'react';
import styled from 'styled-components';

import Header from '../../shared/components/Header';
import Posts from './Posts';
import InputComponentSearch from '../../shared/components/InputComponentSearch'
import { Publish } from './Publish';

export const TimeLine = () => {
  const [tela, setTela] = useState(window.screen.width);
  window.addEventListener('resize', () => {
    setTela(window.screen.width)
  }, true);

return (
  <>
    <Header />
    <MainContainer>
      <Content>

        {tela <= 768 ? <InputComponentSearch widthProps={"95vw"} /> : ""}
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

import React from 'react';
import styled from 'styled-components';
import Img from '../../assets/logoDriven.png';

export const PublishComponent = () => {

  return (
    <>
    <Content>
      <ImgContainer>
        <img src={Img}></img>
      </ImgContainer>
      <InputsContainer>
      
      </InputsContainer>
    </Content>
    </>
  )
}

const Content = styled.div`
display: flex;
flex-direction: row;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;

`;
const ImgContainer = styled.div`
display: flex;
flex-direction: row;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
width: 50px;
height: 50px;
background: url(image.png);
border-radius: 26.5px;
`;

const InputsContainer = styled.div`
display: flex;
flex-direction: row;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`;
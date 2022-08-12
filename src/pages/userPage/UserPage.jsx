import { useState } from 'react';
import styled from 'styled-components';

import Header from '../../shared/components/Header';
import Posts from '../timeLine/Posts';
import InputComponentSearch from '../../shared/components/InputComponentSearch'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export const UserPage = () => {
    const [tela, setTela] = useState(window.screen.width);
    const [userPosts, setUserPosts] = useState([])
    window.addEventListener('resize', () => {
        setTela(window.screen.width)
    }, true);

    const params = useParams();
    const { id } = params;


    console.log(id)
    console.log(userPosts)

    return (
        <>
            <Header />
            <MainContainer>
                <Content>
                    {tela <= 768 ? <span><InputComponentSearch widthProps={"95vw"} /></span> : ""}
                    {userPosts.length > 0 ?
                        <span className='title'>
                            <img src={userPosts[0].avatar} alt="" />
                            <Title>{userPosts[0].username}'s posts</Title>
                        </span>
                        : <Title>User not found</Title>}
                    <Posts userId={parseInt(id)} setUserPosts={setUserPosts} />
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
  z-index: 0;
  .title{
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 43px;
    z-index: 0;
  }
  .title > img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 20px;

  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
    margin-top: 91px;
    span{
        z-index: 2;
    }
    .title{
        padding: 20px;
        margin-bottom: 0;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
  @media screen and (max-width: 768px) {
    margin-bottom: 19px;
    padding: 0 17px;
    font-size: 33px;
  }
`;

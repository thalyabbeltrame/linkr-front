import { useState } from 'react';
import styled from 'styled-components';
import { getPostOfSigleUserById } from '../../services/apiRequests';
import Header from '../../components/header/Header';
import Posts from '../timeLine/Posts';
import InputSearch from '../../components/header/InputSearch'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useAuth } from '../../providers/auth';
import { usePosts } from '../../providers/posts';

export const UserPage = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const [error, setError] = useState(false);
  const {
    dataPosts,
    setDataPosts,
    user,
    setUser,
    hasUpdate
  } = usePosts();


  const params = useParams();
  const { id } = params;


  useEffect(() => {
    getPostOfSigleUserById(id)
      .then(({ data }) => {
        setUser(data.user)
        setDataPosts(data.posts);
        setLoading(false);

      })
      .catch((err) => {
        setLoading(false);
        handleError(err);
      });
  }, [hasUpdate, id]);


  const handleError = (error) =>
    error.response.status === 401 ? logout() : setError(true);


  const [tela, setTela] = useState(window.screen.width);
  window.addEventListener(
    'resize',
    () => {
      setTela(window.screen.width);
    },
    true
  );
  return (
    <>
      <Header />
      <MainContainer>
        <Content>
          {tela <= 768 ? <span><InputSearch widthProps={"95vw"} /></span> : ""}
          {user.length > 0 ?
            <span className='title'>
              <img src={user[0].avatar} alt="" />
              <Title>{user[0].username}'s posts</Title>
            </span>
            : <Title>User not found</Title>}
          <Posts
            userId={parseInt(id)}
            dataPosts={dataPosts}
            setDataPosts={setDataPosts}
            error={error}
            loading={loading}
          />
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

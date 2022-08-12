import { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { useAuth } from '../../providers/auth';
import { useTimeline } from '../../providers/timeline';
import { postTimelineRequest } from '../../services/apiRequests';

export const Publish = () => {
  const { userData, logout } = useAuth();
  const { hasUpdate, setHasUpdate } = useTimeline();
  const [isLoading, setIsLoading] = useState(false);
  const [publishData, setPublishData] = useState({
    link: '',
    text: '',
  });

  const handleError = (error) => {
    if (error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'OOPS...',
        text: 'An error occured while trying to fetch the trending hashtags, please refresh the page',
      });
      logout();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await postTimelineRequest(publishData);
      setHasUpdate(!hasUpdate);
      setPublishData({
        link: '',
        text: '',
      });
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setPublishData((publishData) => {
      return {
        ...publishData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <Content>
        <ImgContainer>
          <img src={userData.image} alt={userData.username} />
        </ImgContainer>
        <InputsContainer>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <span>What are you going to share today?</span>
            <input
              type='text'
              placeholder='http://...'
              name='link'
              onChange={handleChange}
              value={publishData.link}
              disabled={isLoading}
              required
            />
            <textarea
              text='text'
              placeholder='Awesome article about #javascript'
              name='text'
              onChange={handleChange}
              value={publishData.text}
              disabled={isLoading}
            />
            <Button disabled={isLoading} type='submit'>
              {isLoading ? 'publishing...' : 'Publish'}
            </Button>
          </Form>
        </InputsContainer>
      </Content>
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 611px;
  height: 209px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 29px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: 164px;
    border-radius: 0px;
    margin-bottom: 16px;
    padding: 15px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 87px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  width: 50px;
  height: 50px;
  background: url(image.png);
  border-radius: 26.5px;

  img {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding-left: 20px;
  width: 100%;
  border-radius: 16px;

  @media screen and (max-width: 768px) {
    padding-left: 0;
  }
`;

const Form = styled.form`
  width: 100%;
  gap: 5px;
  display: flex;
  flex-direction: column;

  span {
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;

    @media screen and (max-width: 768px) {
      font-size: 17px;
      line-height: 20px;
      text-align: center;
    }
  }

  input {
    width: 100%;
    height: 30px;
    background: #efefef;
    border: none;
    border-radius: 5px;
    padding: 7px 13px;
    font-size: 15px;
    font-weight: 300;
    line-height: 18px;

    &::placeholder {
      color: #949494;

      @media screen and (max-width: 768px) {
        font-size: 13px;
        line-height: 16px;
      }
    }
  }

  textarea {
    font-family: 'Lato', sans-serif;
    width: 100%;
    min-height: 66px;
    background: #efefef;
    border-radius: 5px;
    border: none;
    resize: vertical;
    padding: 8px 12px;
    font-size: 15px;
    font-weight: 300;
    line-height: 18px;

    @media screen and (max-width: 768px) {
      min-height: 47px;
    }

    &::placeholder {
      color: #949494;

      @media screen and (max-width: 768px) {
        font-size: 13px;
        line-height: 16px;
      }
    }
  }
`;

const Button = styled.button`
  width: 112px;
  height: 31px;
  align-self: flex-end;
  background: #1877f2;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  ${(props) => props.disabled && 'opacity: 0.5;'}
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    height: 22px;
    font-size: 13px;
    line-height: 16px;
  }
`;

import { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import styled from 'styled-components';

import { alert } from '../../Helpers/alert';
import { useAuth } from '../../providers/AuthProvider';

import {
  getCommentsByPostIdRequest,
  postCommentRequest,
} from '../../services/apiRequests';
import { Comment } from './Comment';

export const Comments = ({ id, isOpen, postAuthor_id }) => {
  const { userData, logout } = useAuth();
  const [comments, setComments] = useState([]);
  const [hasCommentsUpdate, setHasCommentsUpdate] = useState(false);
  const [input, setInput] = useState('');

  const handleError = (error) => {
    const message = error.response;
    if (message === 'Unauthorized') {
      return logout();
    }
    alert('error', 'An error has occurred, try again!', message);
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await getCommentsByPostIdRequest(id);
        setComments(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    getComments();
  }, [hasCommentsUpdate]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitComment(e);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      return alert('info', 'Comment cannot be empty!');
    }

    try {
      await postCommentRequest(id, input);
      setHasCommentsUpdate((hasUpdateComments) => !hasUpdateComments);
      setInput('');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      {isOpen ? (
        <Container>
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} author_id={postAuthor_id} />
          ))}
          <form onSubmit={(e) => submitComment(e)}>
            <img src={userData.image} alt={userData.username} />
            <input
              type='text'
              value={input}
              placeholder='write a comment...'
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <button type='submit'>
              <FiSend
                style={{
                  color: '#fff',
                  width: '20px',
                  height: '20px',
                }}
              />
            </button>
          </form>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  border-radius: 0 0 16px 16px;
  margin: 0 5px;
  padding: 0 20px;
  position: relative;

  form {
    display: flex;
    flex-direction: row;
    margin: 19px 0;
    width: 100%;

    img {
      min-width: 39px;
      height: 39px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 14px;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 8px 8px 0;
      background: #252525;
      border: none;
      position: absolute;
      right: 40px;
      bottom: 28px;
    }
  }

  input {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    padding: 0 15px;
    color: #ffffff;
    outline: none;

    &::placeholder {
      font-style: italic;
      color: #575757;
    }
  }
`;

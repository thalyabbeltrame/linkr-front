import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactTagify } from 'react-tagify';
import styled from 'styled-components';

import { alert } from '../../Helpers/alert';
import { useAuth } from '../../providers/AuthProvider';
import { usePosts } from '../../providers/PostsProvider';
import { useTrending } from '../../providers/TrendingsProvider';
import { updatePost } from '../../services/apiRequests';

export const TextTitle = ({ id, text, setIsOpen, isEditing, setIsEditing }) => {
  const { setUpdateTrending } = useTrending();
  const { setHasUpdate } = usePosts();
  const { logout } = useAuth();
  const [newDescription, setNewDescription] = useState(text);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onUpdatePosts = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updatePost(id, newDescription);
      setHasUpdate((update) => !update);
      setUpdateTrending((update) => !update);
    } catch (err) {
      let message = err.response.data;
      if (message === 'Unauthorized') {
        return logout();
      }
      alert('error', 'failed to edit the post', message);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setIsEditing(false);
    }
  };
  const tagStyle = {
    color: 'white',
    cursor: 'pointer',
    fontWeight: '700',
  };

  const handleHashtagClick = (tag) =>
    navigate(`/hashtag/${tag.replace('#', '').toLowerCase()}`);

  return isEditing ? (
    <EditingText
      ref={inputRef}
      type='text'
      value={newDescription}
      onChange={(e) => setNewDescription(e.target.value)}
      disabled={isLoading}
      onKeyDown={(e) => {
        if (e.keyCode === 27) {
          setIsEditing(false);
        } else if (e.keyCode === 13) {
          onUpdatePosts(e);
        }
      }}
    ></EditingText>
  ) : (
    <Text>
      <ReactTagify
        tagStyle={tagStyle}
        tagClicked={(tag) => handleHashtagClick(tag)}
      >
        <p>{text}</p>
      </ReactTagify>
    </Text>
  );
};

const EditingText = styled.textarea`
  resize: vertical;
  background: #171717;
  width: 100%;
  max-height: 150px;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  background: #ffffff;
  border-radius: 7px;
  margin-bottom: 10px;
  &:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }
  @media (max-width: 610px) {
    font-size: 15px;
    line-height: 18px;
  }
`;
const Text = styled.div`
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;

  @media (max-width: 610px) {
    font-size: 15px;
    line-height: 18px;
  }
`;

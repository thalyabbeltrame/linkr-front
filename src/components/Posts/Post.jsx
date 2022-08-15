
import { useEffect, useRef, useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { RiPencilFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ReactTagify } from 'react-tagify';
import styled from 'styled-components';

import { useTrending } from '../../providers/TrendingsProvider';
import { usePosts } from '../../providers/PostsProvider';
import { updatePost } from '../../services/apiRequests';
import { DeleteModal } from './DeleteModal';
import { LinkPreview } from './LinkPreview';
import { Likes } from './Likes';
import { alert } from '../../Helpers/alert';

export const Post = ({
  id,
  avatar,
  username,
  text,
  title,
  description,
  link,
  image,
  likes,
  user_id
}) => {


  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(text);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const { setUpdateTrending } = useTrending();
  const navigate = useNavigate();
  const { hasUpdate, setHasUpdate } = usePosts();
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleHashtagClick = (tag) =>
    navigate(`/hashtag/${tag.replace('#', '').toLowerCase()}`);


  const tagStyle = {
    color: 'white',
    cursor: 'pointer',
    fontWeight: '700',
  };
  const onUpdatePosts = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updatePost(id, newDescription);
      setHasUpdate(!hasUpdate);
      setUpdateTrending((update) => !update);
    } catch (err) {
      alert('error', 'failed to update the post', err.response.data)
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setIsEditing(false);
    }
  }
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  return (
    <>
      <DeleteModal id={id} isOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <PostContent>
        <LeftSide>
          <img src={avatar} alt={username} />
          <Likes id={id} likes={likes} />
          
        </LeftSide>
        <RightSide>
          <span>

            <h3 onClick={() => navigate(`/user/${user_id}`)}>{username}</h3>
            <div>
              <p onClick={() => setIsEditing(!isEditing)}>
                <RiPencilFill fontSize='1.3em' color='#FFFFFF' />
              </p>
              <p onClick={() => setIsOpen((e) => !e)}>
                <IoMdTrash fontSize='1.3em' color='#FFFFFF' />
              </p>
            </div>
          </span>
          {
            isEditing ?
              (<EditingText
                ref={inputRef}
                type="text"
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.keyCode === 27) {
                    setIsEditing(false)
                  } else if (e.keyCode === 13) {
                    onUpdatePosts(e)
                  }
                }} ></EditingText>
              ) : (
                <Text>
                  <ReactTagify
                    tagStyle={tagStyle}
                    tagClicked={(tag) => handleHashtagClick(tag)}
                  >
                    <p>{text}</p>
                  </ReactTagify>
                </Text>
              )
          }
          <LinkPreview
            title={title}
            description={description}
            link={link}
            image={image}
          />
        </RightSide>
      </PostContent>
    </>
  );
};

const PostContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #171717;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    border-radius: 0;
    padding: 15px;
  }
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  height: 100%;
  margin-right: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 19px;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    margin-right: 15px;

    img {
      width: 40px;
      height: 40px;
      margin-bottom: 17px;
    }
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: flex-start;
  background: #171717;

  h3 {
    cursor: pointer;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    margin-bottom: 7px;
    &:hover {
      text-decoration: underline;
    }
  }

  p {
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin-bottom: 10px;
    word-break: break-word;
  }
  span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  p :last-child {
    cursor: pointer;
  }
  div{
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  @media screen and (max-width: 768px) {
    h3 {
      font-size: 17px;
      line-height: 20px;
    }

    p {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;
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
    background: #FFFFFF;
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
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;

    color: #B7B7B7;

    @media (max-width: 610px) {
        font-size: 15px;
        line-height: 18px;
    }
`;

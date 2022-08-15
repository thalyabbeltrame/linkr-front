import { useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { RiPencilFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../providers/AuthProvider';
import { DeleteModal } from './DeleteModal';
import { Likes } from './Likes';
import { LinkPreview } from './LinkPreview';
import { TextTitle } from './Text';

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
  user_id,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { userData } = useAuth();
  const navigate = useNavigate();
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
            {userData.id === user_id ? (
              <div>
                <RiPencilFill
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsEditing(!isEditing)}
                  fontSize='1.3em'
                  color='#FFFFFF'
                />
                <IoMdTrash
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsOpen((e) => !e)}
                  fontSize='1.3em'
                  color='#FFFFFF'
                />
              </div>
            ) : null}
          </span>
          <TextTitle
            id={id}
            text={text}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            setIsOpen={setIsOpen}
          />
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
  div {
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

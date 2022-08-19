import { useEffect, useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { RiPencilFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../providers/AuthProvider';
import { Comments } from './Comments';
import { CommentsCount } from './CommentsCount';
import { DeleteModal } from './DeleteModal';
import { Likes } from './Likes';
import { LinkPreview } from './LinkPreview';
import { RepostComponent } from './RepostComponent';
import { RepostCount } from './RepostCount';
import { RepostModal } from './RepostModal';
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
  comments_count,
  reposts_count,
  is_repost,
  reposted_by,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isRepostOpen, setIsRepostOpen] = useState(false);
  const [myRepost, setMyRepost] = useState(false);
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (reposted_by === userData.id) {
      setMyRepost(true);
    }
  }, [id]);

  return (
    <>
      {is_repost === true ? (
        <RepostComponent reposted_by={reposted_by} myRepost={myRepost} />
      ) : (
        ''
      )}
      <DeleteModal id={id} isOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <RepostModal id={id} isOpen={isRepostOpen} setIsOpen={setIsRepostOpen} />

      <PostContent>
        <Main>
          <LeftSide>
            <img src={avatar} alt={username} />
            <Interactions>
              <Likes id={id} likes={likes} is_repost={is_repost} />
              <CommentsCount
                is_repost={is_repost}
                count={comments_count}
                setIsOpen={setIsCommentOpen}
              />
              <RepostCount
                is_repost={is_repost}
                count={reposts_count}
                setIsOpen={setIsRepostOpen}
              />
            </Interactions>
          </LeftSide>
          <RightSide>
            <span>
              <h3 onClick={() => navigate(`/user/${user_id}`)}>{username}</h3>
              {userData.id === user_id ? (
                <div>
                  <RiPencilFill
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      is_repost ? null : setIsEditing(!isEditing);
                    }}
                    fontSize='1.3em'
                    color='#FFFFFF'
                  />
                  <IoMdTrash
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      is_repost ? null : setIsOpen((e) => !e);
                    }}
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
        </Main>
        <Comments id={id} isOpen={isCommentOpen} postAuthor_id={user_id} />
      </PostContent>
    </>
  );
};

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  border-radius: 16px;
  background: #1e1e1e;
  height: auto;

  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  background: #171717;
  padding: 20px 20px 20px 11px;
  border-radius: 16px;

  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  margin-right: 11px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    width: 70px;
    margin-right: 11px;

    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const Interactions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: calc(100% - 50px);

  @media screen and (max-width: 768px) {
    height: calc(100% - 40px);
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

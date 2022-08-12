import { AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ReactTagify } from 'react-tagify';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import { useAuth } from '../../providers/auth';
import { LinkPreview } from './LinkPreview';

const Post = (props) => {
  const { avatar, username, text, title, description, link, image, likes } =
    props;
  const { userData } = useAuth();
  const navigate = useNavigate();

  const handleHashtagClick = (tag) =>
    navigate(`../hashtag/${tag.replace('#', '').toLowerCase()}`);

  const buildTooltipMessage = (users) => {
    const numberOfLikes = users.length;
    const userLiked = users.map((user) => user.id).includes(userData.id);
    if (numberOfLikes === 0) return 'Be the first to like this post';
    if (userLiked) {
      return numberOfLikes === 1
        ? 'You'
        : `You, ${users[0].username} and other 
                ${numberOfLikes - 2} people`;
    } else {
      return numberOfLikes === 1
        ? `${users[0].username}`
        : `${users[0].username}, ${users[1].username} and other ${
            numberOfLikes - 2
          } people`;
    }
  };

  const tooltipMessage = buildTooltipMessage(likes);

  const tagStyle = {
    color: 'white',
    cursor: 'pointer',
    fontWeight: '700',
  };

  return (
    <PostContent>
      <LeftSide>
        <img src={avatar} alt={username} />
        <AiOutlineHeart
          style={{
            color: '#fff',
            width: '25px',
            height: '25px',
            marginBottom: '5px',
          }}
        />
        <Likes data-tip={tooltipMessage}>
          {likes.length} {likes.length === 1 ? 'like' : 'likes'}
        </Likes>
        <ReactTooltip place='bottom' type='light' effect='solid' />
      </LeftSide>
      <RightSide>
        <h3>{username}</h3>
        <ReactTagify
          tagStyle={tagStyle}
          tagClicked={(tag) => handleHashtagClick(tag)}
        >
          <p>{text}</p>
        </ReactTagify>
        <LinkPreview
          title={title}
          description={description}
          link={link}
          image={image}
        />
      </RightSide>
    </PostContent>
  );
};

export default Post;

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

const Likes = styled.p`
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;

  @media screen and (max-width: 768px) {
    font-size: 9px;
    line-height: 11px;
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
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    margin-bottom: 7px;
  }

  p {
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin-bottom: 10px;
    word-break: break-word;
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

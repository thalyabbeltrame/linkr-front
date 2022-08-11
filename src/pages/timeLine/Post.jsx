import styled from 'styled-components';
import { ReactTagify } from "react-tagify";
import { useNavigate } from 'react-router-dom';

const Post = (props) => {
  const { avatar, username, text, title, description, link, image } = props;
  const navigate = useNavigate()
  const handleClick = () => window.open(link, '_blank');
  const tagStyle = {
    color: 'white',
    cursor: 'pointer',
    fontWeight: '700'
  }
  return (
    <PostContent>
      <LeftSide>
        <img src={avatar} alt={username} />
      </LeftSide>
      <RightSide>
        <h3>{username}</h3>
        <ReactTagify
          tagStyle={tagStyle}
          tagClicked={(tag) => navigate(`../hashtag/${(tag.replace('#','')).toLowerCase()}`)}>
          <p>{text}</p>
        </ReactTagify>

        <LinkPreview onClick={handleClick}>
          <div>
            <h2>{title}</h2>
            <h3>{description}</h3>
            <p>{link}</p>
          </div>
          <img src={image} alt='' />
        </LinkPreview>
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
  width: 87px;
  height: 100%;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  @media screen and (max-width: 768px) {
    width: 69px;

    img {
      width: 40px;
      height: 40px;
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

const LinkPreview = styled.div`
  display: flex;
  flex-direction: row;
  color: #ffffff;
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  position: relative;
  cursor: pointer;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    width: 330px;
    height: 100%;
    padding: 20px;
  }

  h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-bottom: 5px;
  }

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 13px;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 11px !important;
    line-height: 13px !important;
    color: #cecece;
    margin-bottom: 0;
  }

  img {
    width: 153px;
    height: 100%;
    border-radius: 0 11px 11px 0;
    position: absolute;
    right: 0;
    top: 0;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 115px;

    div {
      width: calc(100% - 95px);
      padding: 7px 11px;
    }

    h2 {
      font-size: 11px;
      line-height: 13px;
    }

    h3 {
      font-size: 9px;
      line-height: 11px;
    }

    p {
      font-size: 9px !important;
      line-height: 11px !important;
      text-align: start;
    }

    img {
      width: 95px;
      height: 115px;
    }
  }
`;

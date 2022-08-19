import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Comment = ({
  comment,
  user_id,
  username,
  avatar,
  is_following,
  author_id,
}) => {
  const navigate = useNavigate();

  const renderExtraInfo = () => {
    if (user_id === author_id) {
      return '• post’s author';
    }
    if (is_following) {
      return '• following';
    }
    return null;
  };

  return (
    <Container>
      <img src={avatar} alt={username} />
      <Content>
        <div>
          <h3 onClick={() => navigate(`/user/${user_id}`)}>{username}</h3>
          <h4>{renderExtraInfo()}</h4>
        </div>
        <p>{comment}</p>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 13px 0;
  border-bottom: 1px solid #353535;
  transform: rotate(-0.1deg);

  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100%-39px);
  height: 100%;
  margin-left: 18px;

  div {
    display: flex;
    flex-direction: row;
  }

  h3 {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
    margin-bottom: 3px;
  }

  h4 {
    font-size: 14px;
    line-height: 17px;
    color: #565656;
    margin-left: 4px;
  }

  p {
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
    word-break: break-word;
    word-wrap: break-word;
  }
`;

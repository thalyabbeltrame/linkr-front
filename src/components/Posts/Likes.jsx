import ReactTooltip from '@huner2/react-tooltip';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import styled from 'styled-components';

import { alert } from '../../Helpers/alert';
import { useAuth } from '../../providers/AuthProvider';
import { usePosts } from '../../providers/PostsProvider';
import { likeDislikeRequest } from '../../services/apiRequests';

export const Likes = ({ id, likes, is_repost }) => {
  const { userData, logout } = useAuth();
  const { setHasUpdate } = usePosts();

  const handleLikeDislike = async () => {
    if (is_repost) return;
    try {
      await likeDislikeRequest(id);
      setHasUpdate((update) => !update);
    } catch (error) {
      let message = err.response.data;
      if (message === 'Unauthorized') {
        return logout();
      }
      alert('error', 'An error has occurred, try again!', message);
    }
  };

  const buildTooltipMessage = (users) => {
    const numberOfLikes = users.length;
    const userLiked = users.map((user) => user.userId).includes(userData.id);
    if (numberOfLikes === 0) return 'Be the first to like this post';
    if (userLiked) {
      return numberOfLikes === 1
        ? 'You'
        : `You, ${users[0].username} and other
                    ${numberOfLikes - 2} people`;
    } else {
      return numberOfLikes === 1
        ? `${users[0].username}`
        : `${users[0].username}, ${users[1].username} and other ${numberOfLikes - 2
        } people`;
    }
  };
  const tooltipMessage = buildTooltipMessage(likes);
  const renderIonIcon = likes
    .map((like) => like.userId)
    .includes(userData.id) ? (
    <AiFillHeart
      onClick={handleLikeDislike}
      size={20}
      style={{
        color: '#AC0000',
        width: '25px',
        height: '25px',
        marginBottom: '3px',
        cursor: 'pointer',
      }}
    />
  ) : (
    <AiOutlineHeart
      onClick={handleLikeDislike}
      style={{
        color: '#fff',
        width: '25px',
        height: '25px',
        marginBottom: '3px',
        cursor: 'pointer',
      }}
    />
  );

  return (
    <Container>
      {renderIonIcon}
      <Like data-tip={tooltipMessage}>
        {likes.length} {likes.length === 1 ? 'like' : 'likes'}
      </Like>
      <ReactTooltip place='bottom' type='light' effect='solid' />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Like = styled.p`
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;

  @media screen and (max-width: 768px) {
    font-size: 9px;
    line-height: 11px;
  }
`;

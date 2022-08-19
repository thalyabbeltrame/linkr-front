import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

import { alert } from '../../Helpers/alert';
import { useAuth } from '../../providers/AuthProvider';
import {
  checkIsUserFollowed,
  followRequest,
  unfollowRequest,
} from '../../services/apiRequests';

export const HandleFollow = ({ id }) => {
  const { userData, logout } = useAuth();
  const Animation = <ThreeDots color='#000000' height={50} width={50} />;
  const [isFollowing, setIsFollowing] = useState(Animation);
  const [loading, setLoading] = useState(false);
  const myUser = userData?.id;

  const handleClick = async () => {
    try {
      setLoading(true);
      if (isFollowing) {
        await unfollowRequest(id);
        setIsFollowing(false);
      } else {
        await followRequest(id);
        setIsFollowing(true);
      }
    } catch (err) {
      let message = err.response.data;
      if (message === 'Unauthorized') {
        return logout();
      }
      alert('error', 'Failed to take action follow/unfollow', message);
    } finally {
      setLoading(false);
    }
  };

  const renderButton =
    myUser === parseInt(id) ? null : isFollowing ? (
      <Button isLoading={loading} disabled={loading} onClick={handleClick}>
        Unfollow
      </Button>
    ) : (
      <Button
        isLoading={loading}
        disabled={loading}
        unfollow
        onClick={handleClick}
      >
        Follow
      </Button>
    );

  useEffect(() => {
    const fetchFollow = async () => {
      try {
        const { data } = await checkIsUserFollowed(id);
        setIsFollowing(data.isFollowing);
      } catch (err) {
        let message = err.response.data;
        if (message === 'Unauthorized') {
          return logout();
        }
        alert('error', 'Failed to load following status', message);
      }
    };
    fetchFollow();
  }, [isFollowing]);

  return renderButton;
};

const Button = styled.button`
  cursor: ${(props) => (props.isLoading ? 'wait' : 'pointer')};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 825px;
  width: 112px;
  height: 32px;
  color: ${(props) => (props.unfollow ? 'white' : '#1877F2')};
  font-weight: 700;
  background-color: ${(props) => (props.unfollow ? '#1877F2' : 'white')};
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => (props.unfollow ? '#4c8ee4' : '#9fc7fa')};
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

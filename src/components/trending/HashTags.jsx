import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTrending } from '../../providers/trendings';
import { EmptyMessage } from './EmptyMessage';
import { LoadingMessage } from './LoadingMessage';
import { Tag } from './Tag';
import { updateTrendingRequest } from './updateTrending';

export const HashTag = () => {
  const [loading, setLoading] = useState(false)
  const { trending, updateTrending, setTrending } = useTrending();
  const { logout } = useTrending();

  useEffect(() => { updateTrendingRequest(setLoading, setTrending, logout) }, [updateTrending])

  const handleRender = () => {
    if (loading) {
      return <LoadingMessage />;
    } else if (!loading && trending.length === 0) {
      return <EmptyMessage>No trending</EmptyMessage>;
    }
    return trending.map((tag) => <Tag key={tag.id} {...tag} />);
  };

  return (
    <HashTagContainer>
      <Title>trending</Title>
      <Line></Line>
      {handleRender()}
    </HashTagContainer>
  );
};

const HashTagContainer = styled.aside`
  position: fixed;
  padding: 12px;
  top: 232px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 950px;
  width: 302px;
  height: 406px;
  border-radius: 16px;
  color: white;
  background-color: #171717;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Title = styled.h2`
  font-weight: 700;
`;
const Line = styled.div`
  margin-top: 16px;
  height: 1px;
  background-color: #484848;
`;

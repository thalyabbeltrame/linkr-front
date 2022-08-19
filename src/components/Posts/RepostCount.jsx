import { BiRepost } from 'react-icons/bi';
import styled from 'styled-components';

export const RepostCount = ({ count, setIsOpen }) => {
  return (
    <Container>
      <BiRepost
        style={{
          color: '#fff',
          width: '25px',
          height: '25px',
          marginBottom: '3px',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(open => !open)}
      />
      <Count>
        {count} {count === 1 ? 'repost' : 'reposts'}
      </Count>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Count = styled.span`
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;

  @media screen and (max-width: 768px) {
    font-size: 9px;
    line-height: 11px;
  }
`;

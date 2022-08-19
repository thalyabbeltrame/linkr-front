import { AiOutlineComment } from 'react-icons/ai';
import styled from 'styled-components';

export const CommentsCount = ({ count, setIsOpen, is_repost }) => {
  const handleClick = () => {
    if (!is_repost) {
      setIsOpen((isOpen) => !isOpen);
    }
  };

  return (
    <Container>
      <AiOutlineComment
        style={{
          color: '#fff',
          width: '25px',
          height: '25px',
          marginBottom: '3px',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      />
      <Count>
        {count} {count === 1 ? 'comment' : 'comments'}
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

import Lottie from 'lottie-react';
import styled from 'styled-components';

import loading from '../../assets/lottie/loading.json';

export const LoadingMessage = () => {
  const style = { height: 300, width: 300 };

  return (
    <EmptyContent>
      <Lottie animationData={loading} style={style} />
    </EmptyContent>
  );
};

const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

import styled from 'styled-components';

export const ContainerForm = ({ children }) => {
  const TITLE = `linkr`;
  const MESSAGE = `save, share and discover
    the best links on the web`;

  return (
    <MainContainer>
      <InfoContainer>
        <Title>{TITLE}</Title>
        <Message>{MESSAGE}</Message>
      </InfoContainer>

      <FormContainer>{children}</FormContainer>
    </MainContainer>
  );
};

const MainContainer = styled.main`
  position: relative;
  display: flex;
  align-items: center;
  height: 100vh;
  padding-left: 40px;
  background-color: #151515;

  @media screen and (max-width: 768px) {
    align-items: flex-start;
    padding-left: 0;
  }
`;

const Title = styled.h1`
  font-family: 'Passion One', cursive;
  font-size: 106px;

  @media screen and (max-width: 768px) {
    font-size: 76px;
    line-height: 84px;
    letter-spacing: 0.05em;
  }
`;

const Message = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: 43px;
  width: 55%;

  @media screen and (max-width: 768px) {
    font-size: 23px;
    line-height: 34px;
    text-align: center;
    width: 65%;
  }
`;

const InfoContainer = styled.div`
  color: white;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 768px) {
    align-items: center;
    margin-top: 10px;
  }
`;
const FormContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100vh;
  background-color: #333333;

  @media screen and (max-width: 768px) {
    top: auto;
    bottom: 0;
    align-items: flex-start;
    width: 100%;
    height: 80vh;
  }
`;

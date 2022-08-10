import styled from "styled-components";

import Logout from "./Logout";
import InputComponetSearch from "./InputComponentSearch";

export default function Header() {

  return (
    <>
      <Container>
        <div className="title">linkr</div>
        <div className="desktop"><InputComponetSearch widthProps={"35vw"} /></div>
        <Logout />
      </Container>
    </>
  );
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px 10px 30px;
  width: 100%;
  height: 72px;

  .title {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    color: #ffffff;
  }
  @media screen and (max-width: 768px){
    .desktop{
        display: none;
    }
  }
  
`

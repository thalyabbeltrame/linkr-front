import React from 'react';
import styled from 'styled-components';
import logo from '../assets/linkr.png';

function Header() {
    return (
            <Container>
                <Logo><img src={logo} alt="logo"width="100%" /></Logo>
            </Container>
    )
}

export default Header

const Container = styled.div`
    position: relative;
    z-index: 2;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    display: flex;
    background-color: #151515;
    top: 0;
`;
const Logo = styled.div`
    img{
    display: block;
    padding-left: 20PX;
    margin-left: auto;
    margin-right: auto;
    max-width: 120px;
    min-width: 100px;
    }

`;
import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    height: 65px;
    border-radius: 6px;
    border: none;
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 700;
    padding: 16px;
    @media screen and (max-width: 768px) {
        height: 55px;
    }
    
`;

export const Button = styled.button`
    width: 100%;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    border: none;
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 700;
    color: white;
    background-color: #1877F2;
    cursor: pointer;
    &:hover {
        background-color: #3386f3;
    }
    @media screen and (max-width: 768px) {
        height: 55px;
    }
`;

export const Form = styled.form`
    width: 100%;
    padding: 40px;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    a {
        color: white;
        text-decoration: underline;
    }

`;


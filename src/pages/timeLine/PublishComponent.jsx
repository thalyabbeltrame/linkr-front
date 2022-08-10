import React from 'react';
import styled from 'styled-components';
import { useAuth } from "../../contexts/auth"
import Swal from 'sweetalert2'
import { useState } from 'react';
import { postTimelineRequest } from '../../services/apiRequests';


export const PublishComponent = () => {
    const { userData, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [publishData, setPublishData] = useState({
        link: '',
        text: ''
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await postTimelineRequest(publishData);
        } catch (err) {
            const { status } = err.response;
            if (status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: "OOPS...",
                    text: "An error occured while trying to fetch the trending hashtags, please refresh the page",
                });
                logout();
            }
        } finally {
            setIsLoading(false);
        }
    }
    const handleChange = (e) => {
        setPublishData((publishData) => {
            return {
                ...publishData,
                [e.target.name]: e.target.value,
            };
        });
    };
    console.log(publishData)
    return (
        <>
            <Content>
                <ImgContainer>
                    <img src={userData.image} alt={userData.username} />
                </ImgContainer>
                <InputsContainer>
                    <Form onSubmit={e => handleSubmit(e)}>
                        <span>What are you going to share today?</span>
                        <input
                            type="text"
                            placeholder="http://..."
                            name="link"
                            onChange={handleChange}
                            value={publishData.link}
                            disabled={isLoading}
                            required
                        />
                        <textarea
                            text="text"
                            placeholder="Awesome article about #javascript"
                            name="text"
                            onChange={handleChange}
                            value={publishData.text}
                            disabled={isLoading}
                        />
                        <Button disabled={isLoading} type="submit" >
                            {isLoading ? "publishing..." : "Publish"}
                        </Button>
                    </Form>
                </InputsContainer>
            </Content>
        </>
    )
}

const Content = styled.div`
display: flex;
flex-direction: row;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
width: 100%;
max-width: 611px;
height: 209px;
border-radius: 16px;

@media screen and (max-width: 768px) {
        width: 100%;
        border-radius: 0px;
    }

`;
const ImgContainer = styled.div`
display: flex;
position: relative;
left: 22px;
top: 22px;
flex-direction: row;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
width: 50px;
height: 50px;
background: url(image.png);
border-radius: 26.5px;
img {
position: relative;
width: 50px;
height: 50px;
border-radius: 26.5px;
}
`;

const InputsContainer = styled.div`
display: flex;
flex-direction: row;
background: #FFFFFF;
margin-left: 35px;
padding: 20px;
width: 100%;
border-radius: 16px;


`;

const Form = styled.form`
    width: 100%;
    gap: 12px;
    display: flex;
    flex-direction: column;
    span {
        font-family: 'Lato';
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        @media (max-width: 610px) {
            font-size: 17px;
            line-height: 20px;
            text-align: center;
        }
    }
    input {
        width: 100%;
        height: 30px;
        background: #EFEFEF;
        border: none;
        border-radius: 5px;
        &::placeholder {
            padding-left: 13px;
            
            font-family: 'Lato';
            font-style: normal;
            font-weight: 300;
            font-size: 15px;
            line-height: 18px;
            color: #949494;
            @media (max-width: 610px) {
                    font-size: 13px;
                    line-height: 16px;
            }
        }
    }
    textarea {
        width: 100%;
        min-height: 66px;
        background: #EFEFEF;
        border-radius: 5px;
        border: none;
        resize: vertical;
        &::placeholder {
            padding-left: 13px;
            font-family: 'Lato';
            font-weight: 300;
            font-size: 15px;
            line-height: 18px;
            color: #949494;
            @media (max-width: 610px) {
                    font-size: 13px;
                    line-height: 16px;
            }
        }
    }
`;

const Button = styled.button`
    width: 112px;
    height: 31px;
    align-self: flex-end;
    background: #1877F2;
    border-radius: 5px;
    border: none;
    color: #FFFFFF;
    ${props => props.disabled && 'opacity: 0.5;'}
    font-family: 'Lato';
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    @media (max-width: 610px) {
        height: 22px;
        font-size: 13px;
        line-height: 16px;
    }
    &:hover {
        cursor: pointer;
    }
`;
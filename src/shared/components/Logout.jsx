import styled from "styled-components"
import { AiOutlineDown } from "react-icons/ai"
import { useState } from "react"

export default function Logout() {
    const [animation, setAnimation] = useState("")
    function handleClick(){
        if(animation === "close" || animation === ""){
            setAnimation("open");
        } else {
            setAnimation("close");
        }
        console.log(animation);
    }
    return (
        <Container status={animation}>
            <div>
                <AiOutlineDown 
                    className={`logout-icon ${animation}`}
                    onClick={handleClick}/>
                <img src="https://ih1.redbubble.net/image.1311114349.9148/flat,750x1000,075,f.jpg" alt="" />
            </div>
            <h2>Logout</h2>
        </Container>
    )
}

const Container = styled.div`
    background: #151515;
    height: ${props => props.status === "" || props.status === "close" ? "100%" : "calc(100% + 50px)"};
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-bottom-left-radius: 10px;
    div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: auto;
        color: #ffffff;
    }
    div > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .logout-icon{
        margin-right: 10px;
    }
    .open {
        animation: for-up 0.6s forwards;
    }
    .close {
        animation: for-down 0.6s forwards;
    }
    h2 {
        display: ${props => props.status === "" || props.status === "close" ? "none": "block"};
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 17px;
        color: #FFFFFF;
    }
    @keyframes for-up {
        from{
            transform: rotate(0);
        }
        to {
            transform: rotate(180deg);
        }
    }
    @keyframes for-down {
        from{
            transform: rotate(180deg);
        }
        to {
            transform: rotate(0);
        }
    }
`
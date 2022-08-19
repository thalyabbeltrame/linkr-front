import React from 'react'
import styled from 'styled-components';
import { BiRepost } from 'react-icons/bi';

export const RepostComponent = ({ reposted_by, myRepost }) => {
    return (
        <PostContent>
            <div>
                <BiRepost
                    style={{
                        color: '#fff',
                        width: '20px',
                        height: '20px',
                        marginBottom: '3px',
                        cursor: 'pointer',
                    }}
                />
                <p>
                    Re-posted by <span>{myRepost === true ? 'you' : reposted_by}</span>
                </p>
            </div>
        </PostContent>
    )
};

const PostContent = styled.div`

height: 70px;
width: 100%;
background: #1e1e1e;
padding-left: 13px;
border-radius: 16px;
position: relative;
top: 40px;
left: 0;
z-index: -1;
div {
    margin-top: 10px;
    height: 33px;
    padding: 10px;
    display: flex;
    align-items: center;
}

p {
    margin-left: 6px;
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    color: #ffffff;
}
span {
    font-weight: bold;
}

@media (max-width: 611px) {
    border-radius: 0;
    width: 100%;
}
`;
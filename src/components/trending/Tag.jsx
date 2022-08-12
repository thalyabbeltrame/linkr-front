import { useNavigate } from "react-router-dom"
import styled from "styled-components";
export const Tag = ({ name }) => {
    const navigate = useNavigate();
    return <TagContent onClick={() => navigate(`../hashtag/${name}`)}>{`# ${name}`}</TagContent>
}

const TagContent = styled.h1`
    cursor: pointer;
    font-weight: 700;
    &:hover {
        color: #ffffffae
    }
`;
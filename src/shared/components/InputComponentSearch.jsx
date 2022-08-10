import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input"
import { searchUsers } from "../../services/apiRequests";

export default function InputComponetSearch({ widthProps }) {

  let search = "";
  const [searchList, setSearchList] = useState([])

  const handleSearch = async (search) => {
    try {
      const { data } = await searchUsers(search);
      setSearchList(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container widthProps={widthProps}>
      <DebounceInput
        minLength={3}
        debounceTimeout={300}
        type="text"
        placeholder="Search for people"
        onChange={(e) => {
          search = e.target.value;
          if(search.length > 0){
            handleSearch(search);
          } else {
            setSearchList([])
          }
        }}
        value={search}
      />
      <span>
        <AiOutlineSearch
          style={{ color: "#C6C6C6", width: "30px", height: "30px" }}
        />
      </span>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  input {
    font-family: "Lato", sans-serif;
    padding: 0px 10px;
    font-size: 19px;
    border: none;
    background: #ffffff;
    border-radius: 8px;
    width: ${props => props.widthProps};
    height: 45px;
    &::placeholder {
      color: #c6c6c6;
    }
  }
  span {
    display: flex;
    align-items: center;
    position: absolute;
    height: 110%;
    right: 10px;
    bottom: 0;
  }
  h2 {
    color: #ffffff;
  }
`;

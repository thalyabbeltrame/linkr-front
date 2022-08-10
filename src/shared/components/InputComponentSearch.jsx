import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

export default function InputComponetSearch({ widthProps }) {
  const [search, setSearch] = useState('');

  return (
    <Container widthProps={widthProps}>
      <input
        type='text'
        placeholder='Search for people'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <span>
        <AiOutlineSearch
          style={{ color: '#C6C6C6', width: '30px', height: '30px' }}
        />
      </span>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  input {
    font-family: 'Lato', sans-serif;
    padding: 0px 10px;
    font-size: 19px;
    border: none;
    background: #ffffff;
    border-radius: 8px;
    width: ${(props) => props.widthProps};
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
`;

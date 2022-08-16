import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { searchUsersRequest } from '../../services/apiRequests';

export const InputSearch = ({ widthProps }) => {
  let search = '';
  const [searchList, setSearchList] = useState([]);
  const [displayStatus, setDisplayStatus] = useState('none');
  const navigate = useNavigate();

  const handleSearch = async (search) => {
    try {
      const { data } = await searchUsersRequest(search);
      setSearchList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const SingleUserOnSearchInput = ({ imgSrc, name, id, follow }) => {
    return (
      <div
        className='user'
        onClick={() => {
          navigate(`/user/${id}`);
        }}
      >
        <img src={imgSrc} alt={'name: ' + name} />
        <h2>{name} &nbsp;</h2>
        <h4>{follow === 1 ? "• following" : ""}</h4>
      </div>
    );
  };

  return (
    <Container widthProps={widthProps} displayStatus={displayStatus}>
      <DebounceInput
        minLength={3}
        debounceTimeout={300}
        type='text'
        placeholder='Search for people'
        onBlur={() => setTimeout(() => setDisplayStatus('none'), 300)}
        onFocus={() => setDisplayStatus('block')}
        onChange={(e) => {
          search = e.target.value;
          if (search.length > 0) {
            handleSearch(search);
          } else {
            setSearchList([]);
          }
        }}
        value={search}
        style={{ zIndex: '1' }}
      />
      <span>
        <AiOutlineSearch
          style={{ color: '#C6C6C6', width: '30px', height: '30px' }}
        />
      </span>
      <div className='search-list'>
        {searchList.length > 0
          ? searchList.map((user, i) => {
              return (
                <SingleUserOnSearchInput
                  imgSrc={user.avatar}
                  name={user.username}
                  id={user.id}
                  follow={user.follow}
                  key={i}
                />
              );
            })
          : ''}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 1;

  input {
    font-family: 'Lato', sans-serif;
    padding: 0px 10px;
    font-size: 19px;
    border: 0px transparent;
    background: #ffffff;
    border-radius: 8px;
    width: ${(props) => props.widthProps};
    height: 45px;

    &::placeholder {
      color: #c6c6c6;
    }

    &:focus {
      outline: none;
    }
  }

  span {
    display: flex;
    align-items: center;
    position: absolute;
    height: 48px;
    right: 10px;
    top: 0;
  }

  h2 {
    color: #ffffff;
  }
  h4 {
    color: #C5C5C5;
  }

  .search-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    background-color: #e7e7e7;
    border-radius: 8px;
    z-index: -1;
    max-height: 100vh;
    padding-top: 45px;
    display: ${(props) => props.displayStatus};
  }

  .user {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 15px 15px;
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    cursor: pointer;
    border-radius: 8px;
    padding: 10px 10px;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      background-color: #b3b3b3;
    }
  }

  h2,
  img {
    cursor: pointer;
    color: #515151;
  }

  img {
    margin-right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

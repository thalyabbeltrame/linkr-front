import { useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { RotatingLines } from 'react-loader-spinner';
import Modal from 'react-modal';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { deletePostRequest } from '../../services/apiRequests';
import { useTimeline } from '../../providers/timeline';

Modal.setAppElement('*');
const customStyles = {
  overlay: { zIndex: 10 },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '597px',
    height: '262px',
    background: '#333333',
    border: 'solid 1px #333333',
    borderRadius: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const Post = (props) => {
  const { hasUpdate, setHasUpdate } = useTimeline();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const {
    id,
    avatar,
    username,
    text,
    title,
    description,
    link,
    image
  } = props;
  async function deletePost(id) {
    setLoading(true)
    try {
      await deletePostRequest(id)
      if (hasUpdate === false) {
        setHasUpdate(true)
      }else{
        setHasUpdate(false)
      }      
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Cannot Delete post',
        text: "Somtething went wrong, please try again.",
      });
    } finally {
      setLoading(false)
      setIsOpen(false);
    }
  }
  const handleClick = () => window.open(link, '_blank');
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        {loading === true ? <RotatingLines strokeColor='white' width={200}  /> :
          <>
            <ModalText>Are you sure you want <br /> to delete this post?</ModalText>
            <ButtonBox>
              <CancelButton onClick={() => setIsOpen(false)} >No, go back</CancelButton>
              <ConfirmButton onClick={() => deletePost(id)}>Yes, delete it</ConfirmButton>
            </ButtonBox>
          </>}
      </Modal>
      <PostContent>
        <LeftSide>
          <img src={avatar} alt={username} />
        </LeftSide>
        <RightSide>
          <span>
            <h3>
              {username}
            </h3>
            <p onClick={() => setIsOpen(true)}>
              <IoMdTrash fontSize="1.3em" color='#FFFFFF' />
            </p>
          </span>
          <p>{text}</p>
          <LinkPreview onClick={handleClick}>
            <div>
              <h2>{title}</h2>
              <h3>{description}</h3>
              <p>{link}</p>
            </div>
            <img src={image} alt='' />
          </LinkPreview>
        </RightSide>
      </PostContent>
    </>
  );
};

export default Post;

const PostContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #171717;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    border-radius: 0;
    padding: 15px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 87px;
  height: 100%;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  @media screen and (max-width: 768px) {
    width: 69px;

    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: flex-start;
  background: #171717;

  h3 {
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    margin-bottom: 7px;
  }

  p {
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin-bottom: 10px;
    word-break: break-word;
  }
  span{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  p :last-child{
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    h3 {
      font-size: 17px;
      line-height: 20px;
    }

    p {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;

const LinkPreview = styled.div`
  display: flex;
  flex-direction: row;
  color: #ffffff;
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  position: relative;
  cursor: pointer;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    width: 330px;
    height: 100%;
    padding: 20px;
  }

  h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-bottom: 5px;
  }

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 13px;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 11px !important;
    line-height: 13px !important;
    color: #cecece;
    margin-bottom: 0;
  }

  img {
    width: 153px;
    height: 100%;
    border-radius: 0 11px 11px 0;
    position: absolute;
    right: 0;
    top: 0;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 115px;

    div {
      width: calc(100% - 95px);
      padding: 7px 11px;
    }

    h2 {
      font-size: 11px;
      line-height: 13px;
    }

    h3 {
      font-size: 9px;
      line-height: 11px;
    }

    p {
      font-size: 9px !important;
      line-height: 11px !important;
      text-align: start;
    }

    img {
      width: 95px;
      height: 115px;
    }
  }
`;


const ModalText = styled.h1`
width: 500px;
height: 82px;
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 34px;
line-height: 41px;
text-align: center;
color: #FFFFFF;
@media (max-width: 635px) {
  font-size: 25px;
  line-height: 30px;
  padding: 10px 25px;
}
`

const CancelButton = styled.button`
width: 134px;
height: 37px;
background-color: #fff;
color: #1877F2;
border-radius: 5px;
text-align: center;
cursor: pointer;
@media (max-width: 635px) {
  width: 108px;
  height: 32px;
  font-size: 14px;
  line-height: 18px;
}
`

const ConfirmButton = styled.button`
width: 134px;
height: 37px;
background-color: #1877F2;
color: #fff;
border-radius: 5px;
text-align: center;
cursor: pointer;
@media (max-width: 635px) {
  width: 108px;
  height: 32px;
  font-size: 14px;
  line-height: 18px;
}
`
const ButtonBox = styled.div`
margin-top: 60px;
display: flex;
justify-content: center;
gap: 27px;
@media (max-width: 635px) {
        gap: 20px;
        
        padding: 10px 0;
    }
`
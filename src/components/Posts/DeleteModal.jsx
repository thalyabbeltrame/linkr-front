import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import Modal from 'react-modal';
import styled from 'styled-components';
import { alert } from '../../Helpers/alert';

import { usePosts } from '../../providers/PostsProvider';
import { useTrending } from '../../providers/TrendingsProvider';
import { deletePostRequest } from '../../services/apiRequests';
import { useAuth } from '../../providers/AuthProvider';

export const DeleteModal = ({ id, isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const { setUpdateTrending } = useTrending();
  const { hasUpdate, setHasUpdate } = usePosts();
  const { logout } = useAuth();

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

  const deletePost = async (id) => {
    setLoading(true);
    try {
      await deletePostRequest(id);
      setHasUpdate(!hasUpdate);
      setUpdateTrending((update) => !update);
    } catch (err) {
      let message = err.response.data;
      if(message === 'Unauthorized') {
        return logout();
      }
      alert('error', 'Failed to delete the post', message)
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      {loading === true ? (
        <RotatingLines strokeColor='white' width={200} />
      ) : (
        <>
          <ModalText>
            Are you sure you want <br /> to delete this post?
          </ModalText>
          <ButtonBox>
            <CancelButton onClick={() => setIsOpen(false)}>
              No, go back
            </CancelButton>
            <ConfirmButton onClick={() => deletePost(id)}>
              Yes, delete it
            </ConfirmButton>
          </ButtonBox>
        </>
      )}
    </Modal>
  );
};

const ModalText = styled.h1`
  width: 500px;
  height: 82px;
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  color: #ffffff;
  @media (max-width: 635px) {
    font-size: 25px;
    line-height: 30px;
    padding: 10px 25px;
  }
`;

const CancelButton = styled.button`
  width: 134px;
  height: 37px;
  font-family: 'Lato', sans-serif;
  border: none;
  background-color: #fff;
  color: #1877f2;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  @media (max-width: 635px) {
    width: 108px;
    height: 32px;
    font-size: 14px;
    line-height: 18px;
  }
`;

const ConfirmButton = styled.button`
  width: 134px;
  height: 37px;
  background-color: #1877f2;
  font-family: 'Lato', sans-serif;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  @media (max-width: 635px) {
    width: 108px;
    height: 32px;
    font-size: 14px;
    line-height: 18px;
  }
`;
const ButtonBox = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 27px;
  @media (max-width: 635px) {
    gap: 20px;

    padding: 10px 0;
  }
`;

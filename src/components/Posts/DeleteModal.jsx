import { useState } from 'react';

import { alert } from '../../Helpers/alert';
import { useAuth } from '../../providers/AuthProvider';
import { usePosts } from '../../providers/PostsProvider';
import { useTrending } from '../../providers/TrendingsProvider';
import { deletePostRequest } from '../../services/apiRequests';

import { ModalComponent } from './Modal';

export const DeleteModal = ({ id, isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const { setUpdateTrending } = useTrending();
  const { hasUpdate, setHasUpdate } = usePosts();
  const { logout } = useAuth();

  const deletePost = async (id) => {
    setLoading(true);
    try {
      await deletePostRequest(id);
      setHasUpdate(!hasUpdate);
      setUpdateTrending((update) => !update);
    } catch (err) {
      let message = err.response.data;
      if (message === 'Unauthorized') {
        return logout();
      }
      alert('error', 'Failed to delete the post', message);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      loading={loading}
      onClickAction={() => deletePost(id)}
      titleMessage={'Are you sure you want to delete this post?'}
      cancelMessage={'No, go back'}
      confirmMessage={'Yes, delete it'}
    />
  );
};

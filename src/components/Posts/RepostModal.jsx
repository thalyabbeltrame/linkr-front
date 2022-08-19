import { useState } from 'react';

import { alert } from '../../Helpers/alert';
import { useAuth } from '../../providers/AuthProvider';
import { usePosts } from '../../providers/PostsProvider';
import { useTrending } from '../../providers/TrendingsProvider';
import { createRepost } from '../../services/apiRequests';

import { ModalComponent } from './Modal';

export const RepostModal = ({ id, isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const { setUpdateTrending } = useTrending();
  const { hasUpdate, setHasUpdate } = usePosts();
  const { logout } = useAuth();

  const sendRepost = async (id) => {
    setLoading(true);
    try {
      await createRepost(id);
      setHasUpdate(!hasUpdate);
      setUpdateTrending((update) => !update);
    } catch (err) {
      let message = err.response.data;
      if (message === 'Unauthorized') {
        return logout();
      }
      alert('error', 'Failed to repost', message);
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
      onClickAction={() => sendRepost(id)}
      titleMessage={'Do you want to re-post this link?'}
      cancelMessage={'No, cancel'}
      confirmMessage={'Yes, share'}
    />
  )



};


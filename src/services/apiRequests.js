import { api } from './api';

export const signInRequest = async (data) => {
  return api.post('/signIn', data);
};

export const signUpRequest = async (data) => {
    return api.post('/signUp',data)
}

export const getTimelineRequest = async () => {
  return api.get('/timeline');
};

export const postTimelineRequest = async (data) => {
  return api.post('/timeline', data);
};

export const searchUsers = async name => {
  return api.get(`search/${name}`);
}
export const getPostOfSigleUserById = (id) => {
  return api.get(`/users/${id}`)
}

export const deletePostRequest = async id => {
  return api.delete( `/delete/${id}`);
}

export const getTrending = async () => {
  return api.get('/trending');
}

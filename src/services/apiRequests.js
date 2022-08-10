import { api } from './api';

export const signInRequest = async (data) => {
  return api.post('/signIn', data);
};

export const signUpRequest = async (data) => {
    return api.post('/signUp',data)
}
export const searchUsers = async (data) => {
    return api.get(`/users/${data}`)
}

export const getTimelineRequest = async () => {
  return api.get('/timeline');
};

export const postTimelineRequest = async (data) => {
  return api.post('/timeline', data);
};


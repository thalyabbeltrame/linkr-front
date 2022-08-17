import { api } from './api';

export const signInRequest = async (data) => {
  return api.post('/signIn', data);
};

export const signUpRequest = async (data) => {
  return api.post('/signUp', data);
};

export const getTimelineRequest = async () => {
  return api.get('/timeline');
};

export const postTimelineRequest = async (data) => {
  return api.post('/timeline', data);
};

export const searchUsersRequest = async (name) => {
  return api.get(`search/${name}`);
};

export const getPostOfSigleUserByIdRequest = (id) => {
  return api.get(`/user-Posts/${id}`);
};

export const likeDislikeRequest = async (postId) => {
  return api.post(`/Posts/${postId}/likeDislike`);
};

export const deletePostRequest = async (id) => {
  return api.delete(`/delete/${id}`);
};

export const getTrendingRequest = async () => {
  return api.get('/trending');
};

export const getPostsByHashtagRequest = async (hashtag) => {
  return api.get(`/hashtag/${hashtag}`);
};

export const updatePost = async (id, text) => {
  return api.put(`/post/update/${id}`, { text: text });
};

export const followRequest = async (id) => {
  return api.post(`/user/${id}/follow`);
};
export const unfollowRequest = async (id) => {
  return api.delete(`/user/${id}/unfollow`);
};

export const checkIsUserFollowed = async (id) => {
  return api.get(`/user/${id}/isFollowed`);
};

export const getCommentsByPostIdRequest = async (id) => {
  return api.get(`/posts/${id}/comments`);
};

export const postCommentRequest = async (id, comment) => {
  return api.post(`/posts/${id}/comments`, { comment });
};

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});
//'https://linkr-marcus-ruda-thalya-yori.herokuapp.com',

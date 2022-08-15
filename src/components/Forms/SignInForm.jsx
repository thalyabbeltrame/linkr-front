import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Form, Input } from './CustomStyles';
import { HandleButtonContent } from './HandleButtonContent';
import { useAuth } from '../../providers/AuthProvider';
import { api } from '../../services/api';
import { signInRequest } from '../../services/apiRequests';
import { isEmpty } from '../../utils/isEmpty';
import { alert } from '../../Helpers/alert';

export const SignInForm = () => {
  const { setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Log In');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(userInfo)) {
      alert('info', 'All fields must be filled!');
      return;
    }
    setLoading(true);
    setMessage((msg) => (msg = 'loading'));
    try {
      const { data } = await signInRequest(userInfo);
      setMessage((msg) => (msg = 'sucess'));
      setUserData(data.user);

      api.defaults.headers['Authorization'] = data.token;
      localStorage.setItem('LinkrAuthUser', JSON.stringify(data.user));
      localStorage.setItem('LinkrAuthToken', data.token);
    } catch (err) {
      setMessage((msg) => (msg = 'error'));
      const { status } = err.response;
      if (status === 401) {
        return alert('error', 'User or password incorrect!');
      }
      alert('error', 'An error has occurred!', err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserInfo((info) => {
      return {
        ...info,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Input
        placeholder='e-mail'
        name='email'
        onChange={(e) => handleChange(e)}
      />
      <Input
        placeholder='password'
        type='password'
        name='password'
        onChange={(e) => handleChange(e)}
      />
      <Button disabled={loading} isLoading={loading}>
        <HandleButtonContent message={message} />
      </Button>
      <Link to='/sign-up'>First time? Create an account!</Link>
    </Form>
  );
};

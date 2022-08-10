import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HandleButtonContent } from '../../shared/HandleButtonContent';
import { useAuth } from '../../contexts/auth';
import { api } from '../../services/api';
import { signInRequest } from '../../services/apiRequests';
import { Button, Form, Input } from '../../shared/CustomStyles';
import { isEmpty } from '../../utils/isEmpty';

export const SignInForm = () => {
  const { setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Sign Up');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(userInfo)) {
      alert('All fields must be filled!');
      return;
    }
    setLoading(true);
    setMessage(msg => msg = 'loading')
    try {
      const { data } = await signInRequest(userInfo);
      setMessage(msg => msg = 'sucess')

      setUserData(data.user);
      api.defaults.headers['Authorization'] = data.token;
      localStorage.setItem('LinkrAuthUser', JSON.stringify(data.user));
      localStorage.setItem('LinkrAuthToken', data.token);
    } catch (err) {
      setMessage(msg => msg = 'error')
      const { status } = err.response;
      if (status === 401) {
        alert('User or password incorrect!');
      }
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

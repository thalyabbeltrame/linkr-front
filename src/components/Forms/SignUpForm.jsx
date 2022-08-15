import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Form, Input } from './CustomStyles';
import { HandleButtonContent } from './HandleButtonContent';
import { signUpRequest } from '../../services/apiRequests';
import { isEmpty } from '../../utils/isEmpty';
import { alert } from '../../Helpers/alert';

export const SignUpForm = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Sign Up');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    username: '',
    image: '',
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
      await signUpRequest(userInfo);
      setMessage((msg) => (msg = 'sucess'));
      navigate('../');
    } catch (err) {
      setMessage((msg) => (msg = 'error'));
      const { status } = err.response;
      if (status === 409) {
        return alert('error', 'The user is already registered!');
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
      <Input
        placeholder='username'
        name='username'
        onChange={(e) => handleChange(e)}
      />
      <Input
        placeholder='picture url'
        name='image'
        onChange={(e) => handleChange(e)}
      />
      <Button disabled={loading} isLoading={loading}>
        <HandleButtonContent message={message} />
      </Button>
      <Link to='/'>Switch back to Sign In</Link>
    </Form>
  );
};

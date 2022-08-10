import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input, Button, Form } from '../../shared/CustomStyles';
import { isEmpty } from '../../utils/isEmpty';
import { signUpRequest } from '../../services/apiRequests';

export const SignUpForm = () => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    username: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(userInfo)) {
      alert('Todos os campos devem ser preenchidos!');
      return;
    }
    setLoading(true);
    try {
      await signUpRequest(userInfo);
      navigate('../');
    } catch (err) {
      const { status } = err.response;
      if (status === 409) {
        alert('Usuário já cadastrado!');
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
        Sign Up
      </Button>
      <Link to='/'>Switch back to log in</Link>
    </Form>
  );
};

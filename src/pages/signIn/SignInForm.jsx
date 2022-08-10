import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Form } from '../../shared/CustomStyles';
import { isEmpty } from '../../utils/isEmpty';
import { signInRequest } from '../../services/apiRequests';
import { useAuth } from '../../contexts/auth';
import { api } from '../../services/api';

export const SignInForm = () => {
  const { setUserData } = useAuth();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
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
      const { data } = await signInRequest(userInfo);
      setUserData(data.user);

      api.defaults.headers['Authorization'] = data.token;
      localStorage.setItem('LinkrAuthUser', JSON.stringify(data.user));
      localStorage.setItem('LinkrAuthToken', data.token);
    } catch (err) {
      const { status } = err.response;
      if (status === 401) {
        alert('Usuário ou senha incorretos!');
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
        Log In
      </Button>
      <Link to='/sign-up'>First time? Create an account!</Link>
    </Form>
  );
};

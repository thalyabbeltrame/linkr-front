import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Form } from '../shared/CustomStyles'
import { isEmpty } from '../utils/isEmpty';
import { signInRequest } from '../services/apiRequests';
export const SignInForm = () => {
    const [userInfo, setUserInfo] = useState(
        {
            email: '',
            password: ''
        }
    );
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(userInfo)) {
            alert("Todos os campos devem ser preenchidos!")
            return
        }
        setLoading(true)
        try {
            const resp = await signInRequest(userInfo)
            //TO DO -> handle
            console.log(resp)
        } catch (err) {
            const { status } = err.response;
            if (status === 401) {
                alert("Usuário ou senha incorretos!")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setUserInfo((info) => {
            return {
                ...info,
                [e.target.name]: e.target.value
            }
        })

    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Input placeholder='e-mail' name='email' onChange={(e) => handleChange(e)} />
            <Input placeholder='password' name='password' onChange={(e) => handleChange(e)} />
            <Button disabled={loading} isLoading={loading}>Log In</Button>
            <Link to="/sign-up">First time? Create an account!</Link>
        </Form>
    )
}
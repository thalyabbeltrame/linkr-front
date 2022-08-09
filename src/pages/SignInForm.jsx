import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Form } from '../shared/CustomStyles'
import { isEmpty } from '../utils/isEmpty';
export const SignInForm = () => {
    const [userInfo, setUserInfo] = useState(
        {
            email: '',
            password: ''
        }
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(userInfo)) {
            alert("Todos os campos devem ser preenchidos!")
        }
        //TODO: request to api to signIn
        console.log("Ok")
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
            <Button>Log In</Button>
            <Link to="/sign-up">First time? Create an account!</Link>
        </Form>
    )
}
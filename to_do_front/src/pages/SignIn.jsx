import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const SignIn = ()=>{
    const [email,setEmail]=useState('')
    const [password, setPassword]=useState('')

    const signIn = async(event)=>{
        event.preventDefault()

        let response = await axios.post('sign_in',{
            'email':email,
            'password':password
        })
        if(response.data.success){
            window.location.href="/"
        }
    }

    return(
        <Form onSubmit={signIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
                <Form.Text className="text-muted">
                Haven't signed up? Head to <a href='/#/signup'>sign up</a>.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default SignIn;
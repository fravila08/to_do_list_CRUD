import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { useState } from 'react';

const SignUp = ()=>{
    
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    const signUp = async(event)=>{
        event.preventDefault()
        let response= await axios.post('sign_up',{
            'name':name,
            'email':email,
            'password':password
        })
        if(response.data.success){
            window.location.href="/#/signin"
        }
        else{
            alert("Invalid input")
        }
    }
    return(
        <Form onSubmit={(event)=>signUp(event)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" onChange={(event)=>setName(event.target.value)}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
                <Form.Text className="text-muted" >
                Already signed up? head to <a href="/#/signin">sign in</a>.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default SignUp;
import React,{useState} from 'react';
import {Button,Form} from 'semantic-ui-react'
import gql from 'graphql-tag'

function Register() {

    // const [value,setvalue] = useState({
    //     username:'',
    //     email:'',
    //     password:'',
    //     confirmPassword:''
    // })

    // const onChange=(event)=>{
    //     setvalue({...valuse,[event.target.name]:event.target.value});
    // }
    const onSubmit = (event) =>{
        event.preventDefault();
    }
    return (
        <div>      
            <h1>register</h1>    
            {/* <Form onSubmit={onSubmit} noValidate>
                <h1>Register</h1>
                <Form.Input
                label="Username"
                placeholder="Username.."
                name="username"
                value={values.username}
                onChange={onChange}/>
                  <Form.Input
                label="Email"
                placeholder="Your Email.."
                name="email"
                value={values.email}
                onChange={onChange}/>
                  <Form.Input
                label="Password"
                placeholder="Password.."
                name="password."
                value={values.password}
                onChange={onChange}/>
                  <Form.Input
                label="Confirm password"
                placeholder="Confirm password.."
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}/>

                <Button type="submit" primary> Register</Button>
                </Form> */}
    </div>
    );
}

// const REGISTER_USER=gql`
// mutation register(
//     $username: String!
//     $email: String!
//     $password: String!
//     $confirmPassword: String!
// ){
//     register()
//         registerInput:{
//             username:$username
//             email:$email
//             password:$password
//             confirmPassword:$confirmPassword
//         }
//     )
//     {
//         id email username createdAt token
//     }
// }`

export default Register
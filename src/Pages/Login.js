import React, {useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Container } from 'semantic-ui-react';
import {AuthContext} from '../context/auth.js';

function Login(props) {
    const context = useContext(AuthContext)

    const [errors, setErrors] = useState('');
    const [values, setvalues] = useState({
        username: '',
        password: '',     
    })

    const onChange = (event) => {
        setvalues({ ...values, [event.target.name]: event.target.value });
    };


    const [LoginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, {data:{login:userdata}}) {
            console.log(userdata);
            console.log(context.user);
            context.login(userdata)
            console.log(context.user);
            props.history.push('/home')
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    const onSubmit = (event) => {
        event.preventDefault();
        LoginUser()
    }
    return (
        <div>
            <Container>
            <Form onSubmit={onSubmit} noValidate className={loading ?"loading": ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username? true:false}
                    onChange={onChange} />               
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password? true:false}
                    onChange={onChange} />             

                <Button type="submit" primary> Login</Button>
            </Form>
            {Object.keys(errors).length>0&&(
            <div className="ui error message">
                <ul className="list">
                    {
                        Object.values(errors).map(value=>(
                            <li key={value}>{value}</li>
                        ))
                    }
                    </ul>
                    </div>
            )}
            </Container>
        </div>
    );
}

const LOGIN_USER = gql`
mutation register(
    $username: String!
    $password: String!
){
    login(
           username:$username
           password:$password
          
    )
    {
        id email username createdAt token
    }
}`

export default Login

import React, { Component } from 'react'
import {Form, Button, Col } from 'react-bootstrap'
import './login.css'
import { login } from '../../services/loginService'
import { notifyFailure } from '../../services/notificationService';
import { Redirect } from 'react-router'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', redirect: false};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({ [name]: value })
      }
    
      handleSubmit(event) {
        event.preventDefault()
        const { email, password} = this.state
        login(email, password)
        .then(data => {
            localStorage.setItem('token', data.data.token)
            this.setState({redirect: true})
            console.log(this.state)
        })
        .catch(error => {
            console.log ('--')
            notifyFailure(error.error)
        })
      }


    render () {
        const { email, password, redirect } = this.state;
        if (redirect) {
           return <Redirect to="/dashboard" push={true} />
        }
        return (
        <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" required value={email} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" required value={password} onChange={this.handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Entrar
                </Button>
            </Form>
        </div>
        )
    }
}

export default Login
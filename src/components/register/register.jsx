import React, { Component } from 'react'
import {Form, Button, Col } from 'react-bootstrap'
import './register.css'
import { register } from '../../services/loginService'
import { notifyAlert, notifyFailure } from '../../services/notificationService';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', name: '', rePassword: ''};
    
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
        const { email, password, rePassword, name} = this.state
        if (password != rePassword) {
            notifyAlert("Senhas não conferem")
        }

        register(email, password, name)
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            notifyFailure("Ocorreu um problema ao registrar")
        })
      }


    render () {
        const { email, password, rePassword, name } = this.state;
        return (
        <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Nome" name="name" required value={name} maxLength={50} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Digite um email" name="email" required value={email} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" name="password" required value={password} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Repita sua senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha novamente" name="rePassword" required value={rePassword} onChange={this.handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Registrar
                </Button>
            </Form>
        </div>
        )
    }
}

export default Register
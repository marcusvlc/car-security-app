import React, { Component } from 'react'
import './loginComponent.css'
import background from '../../assets/img/login-bg.jpg'
import Login from '../login/login'
import Register from '../register/register'

class LoginComponent extends Component {
    render () {
        return (
            <div className="login-container">
                <div className="wallpaper">
                    xdxd
                </div>

                <div className="login">
                    {this.props.showLogin ? 
                    <Login/>
                    :
                    <Register/>
                }
                </div>

            </div>
        )
    }
}

export default LoginComponent
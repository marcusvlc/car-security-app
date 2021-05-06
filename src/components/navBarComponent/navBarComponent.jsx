import React, {Component} from 'react'
import './navBarComponent.css'
import logo from '../../../src/assets/img/car-icon.svg'
import {NavLink} from 'react-router-dom'


class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    handleLogout() {
        localStorage.removeItem('token');
        window.location.href = "/"
    }

    componentDidMount() {
        const navbar = document.querySelector('.navbar-container');
        window.onscroll = () => {
            if (window.scrollY > 150) {
                navbar.classList.add('nav-active');
            } else {
                navbar.classList.remove('nav-active');
            }
        }
    }

    render() {
        return (
            <div className="navbar-container">
                <div className="logo">
                    <img className="logo-image" src={logo}></img>
                    <NavLink to="/dashboard" className="logo-title navbar-text">CAR SECURITY</NavLink>
                </div>

                <div className="items">
                    <NavLink to="/dashboard" className="list-item navbar-text">INÍCIO</NavLink>
                    <NavLink to="/dashboard/stream/list" className="list-item navbar-text">DETECÇÕES</NavLink>
                    <NavLink to="/dashboard/plates" className="list-item navbar-text">PLACAS</NavLink>
                    <span className="list-item navbar-text" onClick={this.handleLogout}>SAIR</span>
                </div>

            </div>
        )
    }
}

export default NavBar
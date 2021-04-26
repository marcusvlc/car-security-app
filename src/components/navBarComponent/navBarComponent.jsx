import React, {Component} from 'react'
import './navBarComponent.css'
import logo from '../../../src/assets/img/car-icon.svg'
import {NavLink} from 'react-router-dom'


class NavBar extends Component {

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
                    <span className="list-item navbar-text">Inicio</span>
                    <span className="list-item navbar-text">Contato</span>
                    <span className="list-item navbar-text">Algo</span>
                    <span className="list-item navbar-text">Algo2</span>
                </div>

            </div>
        )
    }
}

export default NavBar
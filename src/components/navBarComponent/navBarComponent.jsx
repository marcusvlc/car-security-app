import React, {Component} from 'react'
import './navBarComponent.css'
import logo from '../../../src/assets/img/car-icon.svg'


class NavBar extends Component {
    render() {
        return (
            <div className="navbar-container">
                <div className="logo">
                    <img className="logo-image" src={logo}></img>
                    <span className="logo-title navbar-text">CAR SECURITY</span>
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
import React, { Component} from 'react'
import './banner.css'
import square_logo from '../../../src/assets/img/square-logo.png'
import engine_icon from '../../../src/assets/img/engine-icon.svg'

class Banner extends Component {
    render() {
        return (
            <div className="banner-container">
                <div className="elements">
                    <img src={square_logo}/>
                    <p className="title">CAR SECURITY</p>
                    <div className="divider-custom">
                        <div className="divider-line"></div>
                        <img src={engine_icon} className="divider-icon"/>
                        <div className="divider-line"></div>
                    </div>
                    <span className="subtitle">Sua solução para o monitoramento de placas veiculares</span>
                </div>
            </div>
        )
    }
}

export default Banner
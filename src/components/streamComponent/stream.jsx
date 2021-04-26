import React, { Component } from 'react'
import './stream.css'
import engine_icon from '../../../src/assets/img/engine-icon.png'
import image_card_bg from '../../../src/assets/img/img-icon.png'
import video_card_bg from '../../../src/assets/img/cam-icon.png'
import rtsp_card_bg from '../../../src/assets/img/stream-icon.png'
import { Card, CardGroup} from 'react-bootstrap'


class Stream extends Component {
    render() {
        return (
            <div className="stream-container">
                <div className="cards-option">
                    <span className="cards-title">SELECIONE UM MODO DE DETECÇÃO</span>
                    <div className="divider-custom">
                        <div className="divider-line dark-bg"></div>
                        <img src={engine_icon} className="divider-icon dark-bg-icon"/>
                        <div className="divider-line dark-bg"></div>
                    </div>
                    <div className="select-cards-container">
                    <div className='card card-profile text-center'>
                        <img alt='' className='card-img-top' src='https://wallpapercave.com/wp/wp1919679.jpg' />
                        <div className='card-block'>
                            <img alt='' className='card-img-profile' src={image_card_bg}/>
                            <h4 className='card-title'>
                                Detecção em imagem
                            <small>Front-end designer</small>
                            </h4>
                            <div className='card-links'>
                            <a className='fa fa-dribbble' href='#'></a>
                            <a className='fa fa-twitter' href='#'></a>
                            <a className='fa fa-facebook' href='#'></a>
                            </div>
                            </div>
                        </div>

                        <div className='card card-profile text-center'>
                        <img alt='' className='card-img-top' src='https://wallpapercave.com/wp/wp1919681.jpg' />
                        <div className='card-block'>
                            <img alt='' className='card-img-profile' src={video_card_bg}/>
                            <h4 className='card-title'>
                                Detecção em vídeo
                            <small>Front-end designer</small>
                            </h4>
                            <div className='card-links'>
                            <a className='fa fa-dribbble' href='#'></a>
                            <a className='fa fa-twitter' href='#'></a>
                            <a className='fa fa-facebook' href='#'></a>
                            </div>
                            </div>
                        </div>

                        <div className='card card-profile text-center'>
                        <img alt='' className='card-img-top' src='https://wallpapercave.com/wp/wp1919687.jpg' />
                        <div className='card-block'>
                            <img alt='' className='card-img-profile' src={rtsp_card_bg}/>
                            <h4 className='card-title'>
                            Detecção em câmera
                            <small>Front-end designer</small>
                            </h4>
                            <div className='card-links'>
                            <a className='fa fa-dribbble' href='#'></a>
                            <a className='fa fa-twitter' href='#'></a>
                            <a className='fa fa-facebook' href='#'></a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Stream
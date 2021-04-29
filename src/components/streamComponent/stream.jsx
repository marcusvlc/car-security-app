import React, { Component } from 'react'
import './stream.css'
import engine_icon from '../../../src/assets/img/engine-icon.png'
import image_card_bg from '../../../src/assets/img/img-icon.png'
import video_card_bg from '../../../src/assets/img/cam-icon.png'
import rtsp_card_bg from '../../../src/assets/img/stream-icon.png'
import { Card, CardGroup} from 'react-bootstrap'
import RegisterStreamModal from '../registerStreamModalComponent/registerStreamModal'


class Stream extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showRegisterStreamModal: false,
            detectionType: ""
        }

        this.handleOpenModal =  this.handleOpenModal.bind(this)
        this.handleCloseModal =  this.handleCloseModal.bind(this)
    }

    handleOpenModal(detectionType) {
        this.setState({showRegisterStreamModal: true, detectionType})
    }

    handleCloseModal() {
        this.setState({showRegisterStreamModal: false})
    }

    render() {
        return (
            <div className="stream-container">
                <RegisterStreamModal show={this.state.showRegisterStreamModal} handleClose={this.handleCloseModal} detectionType={this.state.detectionType}/>
                <div className="cards-option">
                    <span className="cards-title">SELECIONE UM MODO DE DETECÇÃO</span>
                    <div className="divider-custom">
                        <div className="divider-line dark-bg"></div>
                        <img src={engine_icon} className="divider-icon dark-bg-icon"/>
                        <div className="divider-line dark-bg"></div>
                    </div>
                    <div className="select-cards-container">
                        <div className='card card-profile text-center' onClick={() => this.handleOpenModal("image")}>
                            <img alt='' className='card-img-top' src='https://wallpapercave.com/wp/wp1919679.jpg' />
                            <div className='card-block'>
                                <img alt='' className='card-img-profile' src={image_card_bg}/>
                                <h4 className='card-title'>
                                    Detecção em imagem
                                <small className="card-info-text">
                                    A detecção em imagem é a melhor forma de analisar a aplicação de maneira isolada.
                                    <br/><br/>
                                    Com esta opção, você será capaz de executar o algoritmo de detecção em imagens a sua escolha.
                                </small>
                                </h4>
                                <div className='card-links'>
                                <a className='fa fa-dribbble' href='#'></a>
                                <a className='fa fa-twitter' href='#'></a>
                                <a className='fa fa-facebook' href='#'></a>
                                </div>
                                </div>
                            </div>

                            <div className='card card-profile text-center' onClick={() => this.handleOpenModal("video")}>
                            <img alt='' className='card-img-top' src='https://wallpapercave.com/wp/wp1919681.jpg' />
                            <div className='card-block'>
                                <img alt='' className='card-img-profile' src={video_card_bg}/>
                                <h4 className='card-title'>
                                    Detecção em vídeo
                                    <small className="card-info-text">
                                        A detecção em vídeo é a melhor forma de analisar uma grande quantidade de informação sem necessariamente ter que capturar imagens.
                                        <br/><br/>
                                        Com esta opção, você poderá executar e acompanhar as detecções do algoritmo em um vídeo de sua escolha.
                                    </small>
                                </h4>
                                <div className='card-links'>
                                <a className='fa fa-dribbble' href='#'></a>
                                <a className='fa fa-twitter' href='#'></a>
                                <a className='fa fa-facebook' href='#'></a>
                                </div>
                                </div>
                            </div>

                            <div className='card card-profile text-center' onClick={() => this.handleOpenModal("rtsp")}>
                            <img alt='' className='card-img-top' src='https://wallpapercave.com/wp/wp1919687.jpg' />
                            <div className='card-block'>
                                <img alt='' className='card-img-profile' src={rtsp_card_bg}/>
                                <h4 className='card-title'>
                                Detecção em câmera
                                <small className="card-info-text">
                                    A detecção em câmeras é bastante útil quando você necessita realizar um monitoramento automático em algum local.
                                    <br/><br/>
                                    Com esta opção, você poderá conectar-se a uma câmera utilizando o protocolo RTSP. Certifique-se sempre que a câmera possui uma url RTSP com acesso externo.
                                </small>
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
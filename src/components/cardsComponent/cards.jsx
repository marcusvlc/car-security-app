import React, { Component} from 'react'
import './cards.css'
import engine_icon from '../../../src/assets/img/engine-icon.png'
import cars_bg from '../../../src/assets/img/cars.jpg'
import { Card, CardColumns } from 'react-bootstrap'
import { Redirect } from 'react-router'

class Cards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect_uri: "", 
            redirect: false
        }

        this.handleRedirect = this.handleRedirect.bind(this)
    }

    handleRedirect (path) {
        this.setState({redirect_uri: path, redirect: true})
    }
    render() {
        if(this.state.redirect) return  <Redirect to={{pathname: this.state.redirect_uri}}/>
        return (
            <div className="cards-container">
                <span className="cards-title">O QUE DESEJA FAZER?</span>
                <div className="divider-custom">
                    <div className="divider-line dark-bg"></div>
                    <img src={engine_icon} className="divider-icon dark-bg-icon"/>
                    <div className="divider-line dark-bg"></div>
                </div>

                <div className="cards">
                    <CardColumns>
                        <Card className="card-container" onClick={() => this.handleRedirect("/dashboard/stream")}>
                            <Card.Img className="card-body-image" variant="top" src={cars_bg} />
                            <Card.Body className="card-body-container">
                            <Card.Title className="card-body-title">Monitoramento em tempo real</Card.Title>
                            <Card.Text className="card-body-text">
                                Cadastre um vídeo, imagem ou endereço de camera RTSP para realizar monitoramento em tempo real de placas veiculares.
                                <br/>Todas as placas detectadas são devidamente salvas em nossa base e você pode consultá-las a qualquer momento.
                            </Card.Text>
                            </Card.Body>
                            {/* <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer> */}
                        </Card>
                        <Card className="card-container" onClick={() => this.handleRedirect("/dashboard/stream/list")}>
                            <Card.Img className="card-body-image" variant="top" src="https://www.clinicalomics.com/wp-content/uploads/2020/03/AI-1156616255-scaled.jpg" />
                            <Card.Body className="card-body-container">
                            <Card.Title className="card-body-title">Minhas detecções</Card.Title>
                            <Card.Text className="card-body-text">
                                Todas suas detecções cadastradas ficam salvas em nosso sistema e você pode iniciá-las 
                                a qualquer momento. Clique aqui para visualizar todas suas detecções.
                            </Card.Text>
                            </Card.Body>
                            {/* <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer> */}
                        </Card>
                        <Card className="card-container" onClick={() => this.handleRedirect("/dashboard/plates")}>
                            <Card.Img className="card-body-image" variant="top" src="https://img.17qq.com/images/nmoohnhcmlv.jpeg" />
                            <Card.Body className="card-body-container">
                            <Card.Title className="card-body-title">Minhas placas</Card.Title>
                            <Card.Text className="card-body-text">
                                Ao realizar detecções, eventualmente, o nosso sistema irá capturar automaticamente algumas placas veículares. 
                                Todas as placas detectadas que possuírem uma legibilidade serão salvas em nossos sistema e você pode 
                                consultá-las a qualquer momento. Clique aqui para acessar sua página de placas.
                            </Card.Text>
                            </Card.Body>
                            {/* <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer> */}
                        </Card>
                    </CardColumns>
                </div>

            </div>
        )
    }
}

export default Cards
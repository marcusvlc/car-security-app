import React, { Component} from 'react'
import './cards.css'
import engine_icon from '../../../src/assets/img/engine-icon.png'
import cars_bg from '../../../src/assets/img/cars.jpg'
import { Card, CardColumns } from 'react-bootstrap'

class Cards extends Component {
    render() {
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
                        <Card className="card-container">
                            <Card.Img className="card-body-image" variant="top" src={cars_bg} />
                            <Card.Body className="card-body-container">
                            <Card.Title className="card-body-title">Monitoramento em tempo real</Card.Title>
                            <Card.Text className="card-body-text">
                                Cadastre um vídeo ou endereço de camera RTSP para realizar monitoramento em tempo real de placas veiculares.
                                <br/>Todas as placas detectadas são devidamente salvas em nossa base e você pode consultá-las a qualquer momento.
                            </Card.Text>
                            </Card.Body>
                            {/* <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer> */}
                        </Card>
                        <Card className="card-container">
                            <Card.Img className="card-body-image" variant="top" src={cars_bg} />
                            <Card.Body className="card-body-container">
                            <Card.Title className="card-body-title">Card title</Card.Title>
                            <Card.Text className="card-body-text">
                                This card has supporting text below as a natural lead-in to additional
                                content.{' '}
                            </Card.Text>
                            </Card.Body>
                            {/* <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer> */}
                        </Card>
                        <Card className="card-container">
                            <Card.Img className="card-body-image" variant="top" src={cars_bg} />
                            <Card.Body className="card-body-container">
                            <Card.Title className="card-body-title">Card title</Card.Title>
                            <Card.Text className="card-body-text">
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This card has even longer content than the first to
                                show that equal height action.
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
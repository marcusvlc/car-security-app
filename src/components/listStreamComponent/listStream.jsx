
import React, {Component } from 'react'
import './listStream.css'
import { getAllStreams } from '../../services/streamService'
import video from '../../../src/assets/img/video.png'
import rtsp from '../../../src/assets/img/rtsp.png'
import image from '../../../src/assets/img/picture.png'
import start from '../../../src/assets/img/start.png'
import engine_icon from '../../../src/assets/img/engine-icon.png'
import { Container, Row, Col } from 'react-bootstrap'



class ListStream extends Component {
    constructor(props) {
        super(props)
        this.state = {
            streams: []
        }
    }

    getWidgetIcon(stream) {
        if(stream.stream_type == "rtsp") {
            return rtsp
        } else if (stream.stream_type == "video") {
            return video
        } else {
            return image
        }
    }

    getWidgetName(stream) {
        if(stream.stream_type == "rtsp") {
            return "Detecção em câmera"
        } else if (stream.stream_type == "video") {
            return "Detecção em vídeo"
        } else {
            return "Detecção em imagem"
        }
    }

    async componentDidMount() {
        const streams = await getAllStreams()
        this.setState({streams: streams.data.data})
    }

    render() {
        console.log(this.state.streams)
        return (
            <div className="list-stream-container">
                <div className="titles">
                    <span className="cards-title">MINHAS DETECÇÕES</span>
                    <div className="divider-custom">
                        <div className="divider-line dark-bg"></div>
                        <img src={engine_icon} className="divider-icon dark-bg-icon"/>
                        <div className="divider-line dark-bg"></div>
                    </div>
                </div>
                <Container>
                    <Row>
                    {this.state.streams.map( (stream) => (
                        <Col sm={3}>
                            <div className={`panel panel-${stream.stream_type} panel-colorful`}>
                                <div className="panel-body text-center">
                                    <p className="text-uppercase mar-btm text-sm">{stream.name}</p>
                                    <hr/>
                                    <img className="stream-icon" src={this.getWidgetIcon(stream)}/>
                                    <hr/>
                                    <p className="h2 text-thin">{this.getWidgetName(stream)}</p>
                                    <small className="start-detection"><img className="start-icon" src={start}/>Iniciar detecção</small>
                                </div>
                            </div>
                        </Col>
                    ))}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ListStream
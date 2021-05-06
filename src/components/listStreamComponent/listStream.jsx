
import React, {Component } from 'react'
import './listStream.css'
import { getAllStreams } from '../../services/streamService'
import video from '../../../src/assets/img/video.png'
import rtsp from '../../../src/assets/img/rtsp.png'
import image from '../../../src/assets/img/picture.png'
import start from '../../../src/assets/img/start.png'
import engine_icon from '../../../src/assets/img/engine-icon.png'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import Detection from '../detectionComponent/detection'



class ListStream extends Component {
    constructor(props) {
        super(props)
        this.state = {
            streams: [],
            loading: true,
            current_stream: undefined,
        }

        this.handleOpenDetection = this.handleOpenDetection.bind(this)
        this.getPageTitle = this.getPageTitle.bind(this)
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

    getPageTitle() {
        if (this.state.current_stream == undefined) {
            return "MINHAS DETECÇÕES"
        } else {
            return "REALIZAR DETECÇÃO"
        }
    }

    handleOpenDetection(stream) {
        this.setState({current_stream: stream})
    }

    async componentDidMount() {
        const streams = await getAllStreams()
        this.setState({streams: streams.data.data, loading: false})
    }

    render() {
        const {loading, current_stream} = this.state
        console.log(current_stream)

        return (
            <div className="list-stream-container">
                <div className="titles">
                    <span className="cards-title">{this.getPageTitle()}</span>
                    <div className="divider-custom">
                        <div className="divider-line dark-bg"></div>
                        <img src={engine_icon} className="divider-icon dark-bg-icon"/>
                        <div className="divider-line dark-bg"></div>
                    </div>
                </div>
                {
                    loading ? 
                        <div className="streams-spinner">
                            <Spinner animation="border"  />
                            <p>Carregando streams</p>

                        </div>
                       
                    :
                    current_stream != undefined ?
                            <Detection stream={current_stream}/>
                        :
                            <Container>
                                <Row>
                                {this.state.streams.map( (stream, index) => (
                                    <Col key={index} sm={3}>
                                        <div className={`panel panel-${stream.stream_type} panel-colorful`}>
                                            <div className="panel-body text-center">
                                                <p className="text-uppercase mar-btm text-sm">{stream.name}</p>
                                                <hr/>
                                                <img className="stream-icon" src={this.getWidgetIcon(stream)}/>
                                                <hr/>
                                                <p className="h2 text-thin">{this.getWidgetName(stream)}</p>
                                                <small onClick={() => this.handleOpenDetection(stream)} className="start-detection"><img className="start-icon" src={start}/>Iniciar detecção</small>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                                </Row>
                            </Container>
                    }
            </div>
        )
    }
}

export default ListStream
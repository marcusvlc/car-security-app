
import React, {Component } from 'react'
import './listStream.css'
import { getAllStreams } from '../../services/streamService'
import video from '../../../src/assets/img/video.png'
import rtsp from '../../../src/assets/img/rtsp.png'
import image from '../../../src/assets/img/picture.png'
import start from '../../../src/assets/img/start.png'
import engine_icon from '../../../src/assets/img/engine-icon.png'
import { Container, Row, Col, Spinner, Pagination } from 'react-bootstrap'
import Detection from '../detectionComponent/detection'



class ListStream extends Component {
    constructor(props) {
        super(props)
        this.state = {
            streams: [],
            loading: true,
            current_page: 1,
            paginate_itens: [],
            total_pages: 0,
            current_stream: undefined,
        }

        this.handleOpenDetection = this.handleOpenDetection.bind(this)
        this.getPageTitle = this.getPageTitle.bind(this)
        this.setPagination = this.setPagination.bind(this)
        this.handleBack = this.handleBack.bind(this)
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

    handleBack() {
        this.setState({current_stream: undefined})
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

    async handlePageClick(number) {
        this.setState({loading: true})
        const streams = await getAllStreams(number)
        this.setState({current_page: number, streams: streams.data.data, loading: false})
        console.log(this.state)
    }

    setPagination(totalPages) {
        let items = []
        for (let number = 1; number <= totalPages; number++) {
            items.push(
              <Pagination.Item key={number} onClick={() => this.handlePageClick(number)} active={number === this.state.current_page}>
                {number}
              </Pagination.Item>,
            );
          }

        this.setState({paginate_itens: items})
    }

    async componentDidMount() {
        const streams = await getAllStreams(1)
        this.setPagination(streams.data.total_pages)
        this.setState({streams: streams.data.data, current_page: 1, total_pages: streams.data.total_pages, loading: false})
        console.log(this.state)
    }

    render() {
        const {loading, current_stream, paginate_itens} = this.state

        return (
            <div className="list-stream-container">
                <div className="titles">
                    <span className="cards-title">{this.getPageTitle()}</span>
                    <br/>
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
                            <div>
                                <div className="stream-toolbar">
                                    <span onClick={this.handleBack} className="back-text">{ `< Voltar`}</span>
                                </div>
                                <Detection stream={current_stream}/>
                            </div>
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
                                <Col md={{ span: 5, offset: 5 }} >
                                    <Pagination>
                                        {
                                            Array(this.state.total_pages).fill(0).map( (value, index) => (
                                                <Pagination.Item key={index+1} onClick={() => this.handlePageClick(index+1)} active={index+1 === this.state.current_page}>
                                                {index+1}
                                            </Pagination.Item>
                                            ))
                                        }
                                    </Pagination>
                                </Col>
                            </Container>
                    }
            </div>
        )
    }
}

export default ListStream
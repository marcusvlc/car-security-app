
import React, {Component } from 'react'
import './listStream.css'
import { getAllStreams } from '../../services/streamService'
import video from '../../../src/assets/img/video.png'
import rtsp from '../../../src/assets/img/rtsp.png'
import image from '../../../src/assets/img/picture.png'
import start from '../../../src/assets/img/start.png'
import engine_icon from '../../../src/assets/img/engine-icon.png'
import trash_icon from '../../../src/assets/img/trash.png'
import { Container, Row, Col, Spinner, Pagination } from 'react-bootstrap'
import Detection from '../detectionComponent/detection'
import { Redirect } from 'react-router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {deleteStream} from '../../services/streamService'



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
            redirect_uri: "",
            redirect: false,
            swal: withReactContent(Swal),
        }

        this.handleOpenDetection = this.handleOpenDetection.bind(this)
        this.getPageTitle = this.getPageTitle.bind(this)
        this.setPagination = this.setPagination.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
        this.handleDeleteStream = this.handleDeleteStream.bind(this)
    }

    handleRedirect (path) {
        this.setState({redirect_uri: path, redirect: true})
    }

    handleDeleteStream(stream_id) {
        const WarningData = {
            title: "Deseja deletar essa stream?",
            type: "warning",
            icon: "warning",
            footer: ""
          };

        Swal.fire({
            ...WarningData,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, desejo excluir',
            onOpen: () => {
                // code
            }
        }).then((result) => {
            if (result.value) {
                this.setState({loading: true})
                deleteStream(stream_id).then((data) => {
                    window.location.reload(true)
                })
            }
        });
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
            return "Detec????o em c??mera"
        } else if (stream.stream_type == "video") {
            return "Detec????o em v??deo"
        } else {
            return "Detec????o em imagem"
        }
    }

    getPageTitle() {
        if (this.state.current_stream == undefined) {
            return "MINHAS DETEC????ES"
        } else {
            return "REALIZAR DETEC????O"
        }
    }

    handleOpenDetection(stream) {
        this.setState({current_stream: stream})
    }

    async handlePageClick(number) {
        this.setState({loading: true})
        const streams = await getAllStreams(number)
        this.setState({current_page: number, streams: streams.data.data, loading: false})
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
        if(this.state.redirect) return  <Redirect to={{pathname: this.state.redirect_uri}}/>

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
                           this.state.streams.length == 0 ? 
                                <div className="empty-objects">
                                    <span className="empty-warning">N??o encontramos nenhuma stream cadastrada. <br/><a onClick={() => this.handleRedirect("/dashboard/stream")} className="empty-redirect">Que tal registrar uma?</a></span>
                                </div>
                           :

                           <Container>
                           <Row>
                           {this.state.streams.map( (stream, index) => (
                               <Col key={index} sm={3}>
                                   <div className={`panel panel-${stream.stream_type} panel-colorful`}>
                                       <div className="panel-body text-center">
                                           <img onClick={() => this.handleDeleteStream(stream.id)} className="remove-icon" src={trash_icon}/>
                                           <p className="text-uppercase mar-btm text-sm">{stream.name}</p>
                                           <hr/>
                                           <img className="stream-icon" src={this.getWidgetIcon(stream)}/>
                                           <hr/>
                                           <p className="h2 text-thin">{this.getWidgetName(stream)}</p>
                                           <small onClick={() => this.handleOpenDetection(stream)} className="start-detection"><img className="start-icon" src={start}/>Iniciar detec????o</small>
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
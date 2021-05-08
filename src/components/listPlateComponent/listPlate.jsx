import React, { Component} from 'react'
import './listPlate.css'
import engine_icon from '../../../src/assets/img/engine-icon.png'
import search_icon from '../../../src/assets/img/search.png'
import plate_icon from '../../../src/assets/img/plate.png'
import { listAllPlates } from '../../services/plateService'
import { Spinner, Container, Col, Pagination, Row } from 'react-bootstrap'
import { getStreamInformation } from '../../services/streamService'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PlateModal from '../plateModalComponent/plateModal'
import { Redirect } from 'react-router'

class ListPlate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            plates: [],
            loading: true,
            total_pages: 0,
            current_page: 1,
            swal: withReactContent(Swal),
            showModal: false,
            selectedPlate: undefined,
            redirect: false,
            redirect_uri: ""
        }

        this.handlePageClick = this.handlePageClick.bind(this)
        this.setPlates = this.setPlates.bind(this)
        this.handleSearchPlate = this.handleSearchPlate.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
    }

    handleRedirect (path) {
        this.setState({redirect_uri: path, redirect: true})
    }

    async handlePageClick(page) {
        this.setState({loading: true})
        this.setPlates(page)
    }

    handleCloseModal() {
        this.setState({showModal: false, selectedPlate: undefined})
    }

    handleSearchPlate = (plate) => {
        const WarningData = {
            title: "Antes de prosseguir...",
            type: "warning",
            icon: "warning",
            text: "Atualmente, nosso sistema possui uma limitação de uma (1) pesquisa a cada cinco minutos. Deseja prosseguir?",
            footer: ""
          };

        Swal.fire({
            ...WarningData,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, desejo pesquisar!',
            onOpen: () => {
                // code
            }
        }).then((result) => {
            if (result.value) {
                this.setState({showModal: true, selectedPlate: plate})
            }
        });
    }
    
    async setPlates(page) {
        const plates = await listAllPlates(page)
        let plates_array = plates.data.plates
        let stream = {}
        let promises = []
        plates_array.forEach((plate) => {
            stream = getStreamInformation(plate.stream_id)
            promises.push(stream)
        })

        promises = await Promise.all(promises)
        promises.forEach ((stream, index) => {
            plates_array[index].stream = stream.data.stream
        })
        
        this.setState({plates: plates_array, total_pages: plates.data.total_pages, current_page: page, loading: false})
    }

    async componentDidMount() {
        this.setPlates(1)
    }   

    render() {
        const { loading } = this.state
        if(this.state.redirect) return  <Redirect to={{pathname: this.state.redirect_uri}}/>

        return (
            <div className="plates-container">
                <div className="titles">
                    <span className="cards-title">SUAS PLACAS DETECTADAS</span>
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
                            <p>Carregando placas, aguarde...</p>

                        </div>
                       
                    :
                        this.state.plates.length == 0 ?
                        <div className="empty-objects">
                            <span className="empty-warning">Não encontramos nenhuma placa detectada. <br/><a onClick={() => this.handleRedirect("/dashboard/stream/list")} className="empty-redirect">Que tal iniciar uma nova detecção?</a></span>
                        </div>
                        :

                        <Container>
                            {this.state.selectedPlate != undefined ? <PlateModal plate={this.state.selectedPlate} show={this.state.showModal} handleClose={this.handleCloseModal} /> : ""}
                            <Row>
                            {this.state.plates.map( (plate, index) => (
                                <Col key={index} sm={3}>
                                    <div className={`panel panel-plate panel-colorful`}>
                                            <div className="panel-body text-center">
                                                <p className="text-uppercase mar-btm text-sm">Placa: {plate.plate_number}</p>
                                                <hr/>
                                                <img className="plate-icon" src={plate_icon} />
                                                <hr/>
                                                <p className="h2 text-thin plate-subtitle">Detectada no dia</p>
                                                <p className="plate-subtitle-response">{`${new Date(plate.detected_date).toLocaleDateString()}`} {"às " + new Date(plate.detected_date).getHours() + ":" + new Date(plate.detected_date).getMinutes()}</p>
                                                <p className="h2 text-thin plate-subtitle">Detectada na stream:</p>
                                                <p className="plate-subtitle-response">{plate.stream.name}</p>
                                                <small onClick={() => this.handleSearchPlate(plate)} className="start-search"><img className="start-icon" src={search_icon}/>Pesquisar placa</small>
                                            </div>
                                        </div>
                                </Col>
                            ))}
                            </Row>
                            {this.state.total_pages > 1 ? 
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
                            : ""} 

                        </Container>
                    }
            </div>
        )
    }
}

export default ListPlate
import React, { Component } from 'react'
import { Modal, Button, Spinner, Container, Row, Col} from 'react-bootstrap'
import './plateModal.css'
import { getPlateInformation } from '../../services/plateService'
import { notifyFailure } from '../../services/notificationService'

class PlateModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            plate_info: undefined,
            loading: true,
            plate_info_get_success: true
        }

        this.getStolenPlateClass = this.getStolenPlateClass.bind(this)
    }

    getStolenPlateClass() {
        let stolenDate = this.state.plate_info.dataAtualizacaoRouboFurto
        stolenDate = stolenDate.trim()

        if (stolenDate.length > 0) {
            return "stolen"
        } else {
            return "not-stolen"
        }

    }

    componentDidMount() {
        getPlateInformation(this.props.plate.plate_number)
        .then((data) => {
            this.setState({plate_info: data.data, loading: false, plate_info_get_success: true})
        })
        .catch((error) => {
            this.setState({loading: false, plate_info_get_success: false})
            notifyFailure("A serviço de consulta de placas encontra-se indisponível no momento. Tente novamente em alguns instantes")
        })
    }

    render() {
        const { plate_info } = this.state
        return (
            <Modal size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered 
                show={this.props.show} 
                onHide={this.props.handleClose}>
            <Modal.Header className="modal-stream-header" closeButton>
              <Modal.Title className="modal-title">Informações gerais sobre a placa <b>{this.props.plate.plate_number}</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                this.state.loading ? 
                    <div className="streams-spinner">
                        <Spinner animation="border"  />
                        <p>Carregando informações, aguarde...</p>
                    </div> 

                    : 
                    
                    this.state.plate_info_get_success ? 
                    <Container>
                        <Row className="plate-info-row">
                            <Col> <span className="plate-topic">Placa: </span> <span className="plate-topic-response">{plate_info.placa}</span>  </Col>
                        </Row>
                        <Row className="plate-info-row">
                            <Col> <span className="plate-topic">Modelo do veículo: </span> <span className="plate-topic-response">{plate_info.modelo}</span>  </Col>
                        </Row>
                        <Row className="plate-info-row">
                            <Col> <span className="plate-topic">Ano do modelo do veículo: </span> <span className="plate-topic-response">{plate_info.anoModelo}</span>  </Col>
                        </Row>
                        <Row className="plate-info-row">
                            <Col> <span className="plate-topic">Chassi: </span> <span className="plate-topic-response">{plate_info.chassi}</span>  </Col>
                        </Row>
                        <Row className="plate-info-row">
                            <Col> <span className="plate-topic">Cor: </span> <span className="plate-topic-response">{plate_info.cor}</span>  </Col>
                        </Row>
                        <Row className="plate-info-row">
                            <Col> <span className="plate-topic">Municipio: </span> <span className="plate-topic-response">{plate_info.municipio}</span>  </Col>
                        </Row>
                        <Row className="plate-info-row">
                            <Col> <span className="plate-topic">Estado: </span> <span className="plate-topic-response">{plate_info.uf}</span>  </Col>
                        </Row>
                        <Row className="plate-info-row">
                            <Col> <span className="plate-topic">Última atualização: </span> <span className="plate-topic-response">{new Date(plate_info.data).toLocaleDateString()}</span>  </Col>
                        </Row>
                        <Row className="plate-info-row">
                            <Col> <span className="plate-topic">Situação: </span> <span className={`plate-topic-response ${this.getStolenPlateClass()}`}>{plate_info.situacao}</span>  </Col>
                        </Row>
                        <Row className="plate-info-row">
                            <Col> <span className="plate-topic">Detectada em: </span> <span className={`plate-topic-response`}>{new Date(this.props.plate.detected_date).toLocaleDateString()} às {new Date(this.props.plate.detected_date).getHours()}:{new Date(this.props.plate.detected_date).getMinutes()}</span>  
                            </Col>
                        </Row>
                        {this.getStolenPlateClass() == "stolen" ? 
                            <Row className="plate-info-row">
                                <Col> <span className="plate-topic">Data do roubo: </span> <span className="plate-topic-response">{plate_info.dataAtualizacaoRouboFurto}</span>  </Col>
                            </Row>
                        : ""}
                  </Container>
                    : 

                    <div className="no-info-content">
                        <p>Sem informações disponíveis no momento</p>
                    </div> 
                
                }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.props.handleClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        )
    }
}

export default PlateModal
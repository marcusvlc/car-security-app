import React, { Component } from 'react'
import { Button, Modal, Alert, Form, Spinner } from 'react-bootstrap'
import './registerStreamModal.css'
import {registerStream} from '../../services/streamService'

class RegisterStreamModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
          stream_url: "",
          stream_name: "",
          stream_file: null,
          is_submiting: false,
        }

        this.getDetectionTypeText = this.getDetectionTypeText.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFileInput = this.handleFileInput.bind(this)
        this.getInputPattern = this.getInputPattern.bind(this)
    }

    handleChange(event) {
      event.preventDefault()
      const { name, value } = event.target
      this.setState({ [name]: value })
  }

  async handleSubmit() {
    this.setState({is_submiting: true})
    let formData = new FormData();
    const {stream_url, stream_name, stream_file} = this.state
    formData.append("stream_url", stream_url);
    formData.append("stream_name", stream_name);
    formData.append("stream_file", stream_file);
    formData.append("stream_type", this.props.detectionType);
    const streamData = await registerStream(formData)
    this.setState({is_submiting: false})
  }

  handleFileInput(event) {
    const file = event.target.files[0]
    this.setState({stream_file: file})
  }

  getInputPattern() {
    let pattern = ""
    if(this.props.detectionType == "image") {
      pattern = 'image/*'
    } else {
      pattern = 'video/*'
    }
    return pattern
  }

  getDetectionTypeText () {
    switch(this.props.detectionType) {
        case "image":
            return "imagem"
        case "video":
            return "vídeo"
        default:
            return "câmera RTSP"
    }
  }

    render() {
        const { stream_url, stream_file, stream_name} = this.state
        const file_pattern = this.getInputPattern()
        console.log(file_pattern)
        return (
            <>        
              <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header className="modal-header" closeButton>
                  <span className="modal-title">Registro de detecção</span>
                </Modal.Header>
                <Modal.Body>
                <Alert variant="primary">
                    <span>Você selecionou o modo de detecção em <b>{this.getDetectionTypeText()}.</b></span>
                    <br/>
                    {this.props.detectionType == "rtsp"? <span>Para câmeras RTSP, certifique-se que as mesmas possuem IP/Portas com acesso a conexão externa.</span> : ""}
                </Alert>

                <Form>
                  <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="stream_name" value={stream_name} onChange={this.handleChange} placeholder="Insira um nome para sua stream" />
                  </Form.Group>
                  {
                    this.props.detectionType == "rtsp" ?
                      <Form.Group>
                        <Form.Label>Insira a url <b>RTSP</b> de sua câmera</Form.Label>
                        <Form.Control type="text" name="stream_url" value={stream_url} onChange={this.handleChange} placeholder="Insira a url RTSP" />
                      </Form.Group>
                    :
                    <Form.Group>
                    <Form.Label>Insira {this.props.detectionType == "image" ? 'sua' : 'seu'} {this.getDetectionTypeText()}</Form.Label> 
                     <Form.File  name="stream_file" accept={file_pattern} onChange={this.handleFileInput}/>
                   </Form.Group>
                  }
                </Form>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={this.props.handleClose}>
                    Fechar
                  </Button>
                  <Button disabled={this.state.is_submiting} id="submit-btn" variant="primary" onClick={this.handleSubmit}>
                    {this.state.is_submiting ? 
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="register-text">Registrando...</span>
                        </>
                   :
                   <span>Continuar</span>  
                  }
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
}

export default RegisterStreamModal
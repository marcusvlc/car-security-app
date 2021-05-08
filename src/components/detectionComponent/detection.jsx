import React,  { Component } from 'react'
import { detectOnImage, detectOnVideo } from '../../services/streamService'
import { DETECTION_API_BASE_URL, VIDEO_DETECTION_URL } from '../../services/apiService'
import { Spinner } from 'react-bootstrap'
import './detection.css'

class Detection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            detected_image: "",
            loading: true,
        }

        this.handleImageCapture = this.handleImageCapture.bind(this)
        this.handleVideoCapture = this.handleVideoCapture.bind(this)
    }

    async handleImageCapture() {
        const response = await detectOnImage(this.props.stream.id)
        const source = `data:image/png;base64, ${response.data.image}`
        this.setState({detected_image: source})
    }

    async handleVideoCapture() {
        const token = localStorage.getItem("token")
        console.log('----------------')
        this.setState({detected_image: `${DETECTION_API_BASE_URL}/${VIDEO_DETECTION_URL}?token=${token}&stream_id=${this.props.stream.id}`})
    }

    handleImageLoaded() {
        this.setState({loading: false})
    }

    componentDidMount() {
        if (this.props.stream.stream_type == 'image') {
            this.handleImageCapture()
        } else {
            this.handleVideoCapture()
        }

    }

    render() {
        const { loading } = this.state
        return (
            <div>
                <div className={!loading ? 'streams-spinner hidden' : 'streams-spinner'}>
                    <Spinner animation="border"  />
                    <p>Carregando detecção, aguarde.</p>
                </div>
        
                <div className={loading ? 'hidden detector-container' : 'detector-container'}>
                    <h1>Realizando detecção em: {this.props.stream.name}</h1>
                    <img width={600} height={400} id="preview" className="stream-img" src={this.state.detected_image} onLoad={this.handleImageLoaded.bind(this)}/>
                </div>

            </div>

        )
    }
}

export default Detection
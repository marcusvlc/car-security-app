import React,  { Component } from 'react'
import { detectOnImage, detectOnVideo } from '../../services/streamService'
import { DETECTION_API_BASE_URL, VIDEO_DETECTION_URL } from '../../services/apiService'

class Detection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            detected_image: ""
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

        this.setState({detected_image: `${DETECTION_API_BASE_URL}/${VIDEO_DETECTION_URL}?token=${token}&stream_id=${this.props.stream.id}`})
    }

    componentDidMount() {
        if (this.props.stream.stream_type == 'image') {
            this.handleImageCapture()
        } else {
            this.handleVideoCapture()
        }

    }

    render() {
        return (
            <div>
                <h1>Olá! {this.props.stream.name}</h1>
                <img id="preview" src={this.state.detected_image}/>
            </div>

        )
    }
}

export default Detection
import React, {Component} from 'react'
import './footer.css'

class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <div className="main-footer"></div>
                <div className="footer-end">
                    <span className="copyright">Copyright © Marcus Costa - {new Date().getFullYear()}</span>
                </div>
            </div>
        )
    }
}

export default Footer
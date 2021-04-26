import React, { Component } from 'react'
import NavBar from '../navBarComponent/navBarComponent'
import Banner from '../bannerComponent/banner'
import Cards from '../cardsComponent/cards'
import Footer from '../footerComponent/footer'
import Stream from '../streamComponent/stream'

class DashboardComponent extends Component {
    constructor(props) {
        super(props)
    }

    handleContent() {
        switch(this.props.content) {
            case 'stream':
                return <Stream/>
            default:
                return <div><Banner/> <Cards/></div>

        }
    }
    render() {
        return (
            <div>
                <NavBar/>
                {this.handleContent()}
                <Footer/>
            </div>
        )
    }
}

export default DashboardComponent
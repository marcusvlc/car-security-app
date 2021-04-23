import React, { Component } from 'react'
import NavBar from '../navBarComponent/navBarComponent'
import Banner from '../bannerComponent/banner'
import Cards from '../cardsComponent/cards'
import Footer from '../footerComponent/footer'

class DashboardComponent extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Banner/>
                <Cards/>
                <Footer/>
            </div>
        )
    }
}

export default DashboardComponent
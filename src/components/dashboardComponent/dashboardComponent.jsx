import React, { Component } from 'react'
import NavBar from '../navBarComponent/navBarComponent'
import Banner from '../bannerComponent/banner'
import Cards from '../cardsComponent/cards'

class DashboardComponent extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Banner/>
                <Cards/>
            </div>
        )
    }
}

export default DashboardComponent
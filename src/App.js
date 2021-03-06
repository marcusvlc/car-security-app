import LoginComponent from "./components/loginComponent/loginComponent";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from "./components/login/login";
import { isAuthenticated } from './services/loginService'
import DashboardComponent from './components/dashboardComponent/dashboardComponent'
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_auth: false,
      loaded: false,
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      isAuthenticated(token).then(data => {
        this.setState({is_auth: data.data.authenticated, loaded: true})
      })
      .catch(error => {
        this.setState({is_auth: false, loaded: true})
      })
    } else {
      this.setState({is_auth: false, loaded: true})
    }
  }

  render() {
    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render={props => {
        const component = this.state.is_auth ?  Component ? <Component  {...props} /> : rest.render(props) : <Redirect to={{pathname: '/', state: { from: props.location}}}/>
        return component
      }} />
    )
    
    if (!this.state.loaded) return null;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" >
              <LoginComponent showLogin={true}/>
          </Route>
          <PrivateRoute exact path ="/dashboard"  render={(props) => <DashboardComponent {...props} content="main" />}/>
          <PrivateRoute exact path ="/dashboard/stream" render={(props) => <DashboardComponent {...props} content="stream" />} />
          <PrivateRoute exact path ="/dashboard/stream/list" render={(props) => <DashboardComponent {...props} content="list_stream" />} />
          <PrivateRoute exact path ="/dashboard/plates" render={(props) => <DashboardComponent {...props} content="list_plate" />} />
          <Route exact path="/register" >
              <LoginComponent showLogin={false}/>
          </Route>
        </Switch>
      </BrowserRouter>
  
    );
  }
}

export default App;

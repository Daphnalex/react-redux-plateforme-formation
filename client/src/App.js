import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Router, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import NavBar from './components/NavBar';
import history from "./helpers/history";
import {connect} from 'react-redux';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authenticated
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

class App extends Component {

  componentReceiveProps(nextProps){
    console.log('mise à jour app')
  }

  render() {
    console.log('localStorage', localStorage);
    return (

      <Router history={history}>
        <div className="App">
          <NavBar />
          <div className="App-content">
            <Route path="/login" component={Login} />
            <PrivateRoute exact path='/' component={Home} authenticated={this.props.localStorage.token_id !== null} />
          </div>
        </div>
      </Router>


    );
  }
}

const mapStateToProps = state =>{
  return ({
    localStorage: state.localStorage
  })
}

export default connect(mapStateToProps) (App);

import React, { Component } from 'react';
import './App.css';
import { Route, Router } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Ressource from './containers/ressource-page';
import NavBar from './components/NavBar';
import history from "./helpers/history";
import {connect} from 'react-redux';

class App extends Component {


  render() {
    if(this.props.localStorage.token === null){
      history.push('/login');
    }
    if(history.location.pathname === '/login' && this.props.localStorage.token !== null){
      history.push('/')
    }
    return (

      <Router history={history}>
        <div className="App">
          <NavBar />
          <div className="App-content">
            <Route path="/login" component={Login} />
            <Route exact path='/' component={Home} />
            <Route exact path='/ressources' component={Ressource} />
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

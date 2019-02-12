import React, { Component } from 'react';
import './App.css';
import { Route, Router } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import User from './containers/user-page';
import Ressource from './containers/ressource-page';
import NavBar from './components/NavBar';
import history from "./helpers/history";
import {connect} from 'react-redux';
import {getCurrentUser} from './actions/userActions';

class App extends Component {


  componentDidMount(){
    //get current user
    this.props.getCurrentUser(this.props.localStorage.token)
  }

  render() {
    //if user not authenticate we redirect user to login page
    console.log('localStorage',this.props.localStorage)
    if(this.props.localStorage.token === null && history.location.pathname !== "/register") {
      history.push('/login');
    }

    //when user logged in if we get user we redirect to home page
    if(history.location.pathname === '/login' && this.props.localStorage.token !== null){
      history.push('/')
    }

    //only administrator is allowed in user page, the other is redirect
    if(history.location.pathname === '/utilisateurs' && this.props.localStorage.currentUser !== null){
      if (this.props.localStorage.currentUser.role !== "admin"){
        history.push('/');
      }  
    }

    return (

      <Router history={history}>
        <div className="App">
          <NavBar />
          <div className="App-content">
            <Route path="/login" component={Login} />
            <Route path='/register' component={Register} />
            <Route exact path='/' component={Home} />
            <Route exact path='/ressources' component={Ressource} />
            <Route exact path='/utilisateurs' component={User} />
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

const mapDispatchToProps = (dispatch) => {
  return {
      getCurrentUser: (token) => {
          dispatch(getCurrentUser(token))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
import React, { Component } from 'react';
import { Navbar, NavItem } from "react-materialize";
import './style.css';
import {logoutUser,getCurrentUser} from '../../actions/userActions';
import {connect} from "react-redux";

class NavBar extends Component {

    componentDidMount(){
        this.props.getCurrentUser(this.props.localStorage.token);
    }

    render() {
        return (
            <div>
                <Navbar brand='Portail de formation' right>
                    {(this.props.localStorage.token) &&
                    <div>
                        <NavItem href="/">Accueil</NavItem>
                        <NavItem href="/ressources">
                            Ressources
                        </NavItem>
                        <NavItem href="/formations">
                            Formations
                        </NavItem>
                        {this.props.localStorage.currentUser !== null && this.props.localStorage.currentUser.role === "admin"
                        &&
                        <NavItem href="/utilisateurs">
                            Gestion des utilisateurs
                        </NavItem>}
                        <NavItem onClick={this.props.logoutUser}>Se déconnecter</NavItem>
                    </div>}
                </Navbar>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('state dans Navbar',state);
    return {
        localStorage: state.localStorage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUser: (token) => {
            dispatch(getCurrentUser(token))
        },
        logoutUser: () => {
            dispatch(logoutUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);

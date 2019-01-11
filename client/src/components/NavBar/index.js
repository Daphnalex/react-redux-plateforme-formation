import React, { Component } from 'react';
import { Navbar, NavItem, Dropdown, Button } from "react-materialize";
import { Redirect } from 'react-router-dom';
import './style.css';
import {logoutUser} from '../../actions/userActions';
import {connect} from "react-redux";

class NavBar extends Component {

    render() {
        return (
            <div>
                <Navbar brand='Portail de formation' right>
                    {(this.props.localStorage.token_id !== null) &&
                    <div>
                        <NavItem href="/">Accueil</NavItem>
                        <NavItem href="/ressources">
                            Ressources
                        </NavItem>
                        <NavItem href="/formations">
                            Formations
                        </NavItem>
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
        logoutUser: () => {
            dispatch(logoutUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);

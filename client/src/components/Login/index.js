import React, { Component } from "react";
import { Card, CardTitle, Row, Col, Input, Icon, Button } from "react-materialize";
import { Redirect } from 'react-router-dom';
import Logo from './img/logo-formation-diplomante.png';
import "./style.css";

import { connect } from "react-redux";
import { loginUser } from '../../actions/userActions';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            user: {}
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.loginUser(this.state.username,this.state.password);
    }

    render() {

        return (
            <div className="Login">
                <Card className='small'
                    header={<CardTitle image={Logo}></CardTitle>}
                >
                    <Row className="login-form">
                        <Col s={12}>
                            <Col s={1}></Col>
                            <Input s={10} id="username" label="Username" onChange={(event) => this.handleChange(event)} value={this.state.username}  validate><Icon>account_circle</Icon></Input>
                        </Col>
                        <Col s={12}>
                            <Col s={1}></Col>
                            <Input s={10} id="password" label="Mot de passe" onChange={(event) => this.handleChange(event)}  value={this.state.password} validate type='password'><Icon>vpn_key</Icon></Input>
                        </Col>
                    </Row>
                    <Row className="validateButton">
                        <Button onClick={(event) => this.handleSubmit(event)}  waves='light'>Se connecter</Button>
                    </Row>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state)
    return ({
        localStorage: state.localStorage
    })
}

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps', dispatch)
    return {
        loginUser: (username, password) => {
            dispatch(loginUser(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
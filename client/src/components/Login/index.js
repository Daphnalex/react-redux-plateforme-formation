import React, { Component } from "react";
import { Card, CardTitle, Row, Col, Input, Icon, Button } from "react-materialize";
import Logo from './img/logo-formation-diplomante.png';
import "./style.css";

import { connect } from "react-redux";
import { loginUser, editInputUser } from '../../actions/userActions';

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
        this.props.editInputUser();
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
            <Row>
                
                <Row className="Login">
                    <Card className='small'
                        header={<CardTitle image={Logo}></CardTitle>}
                    >
                        <Row className="login-form">
                            <Col s={12}>
                                <Col s={1}></Col>
                                <Input s={10} id="username" label="Nom d'utilisateur" onChange={(event) => this.handleChange(event)} value={this.state.username}  validate><Icon>account_circle</Icon></Input>
                            </Col>
                            <Col s={12}>
                                <Col s={1}></Col>
                                <Input s={10} id="password" label="Mot de passe" onChange={(event) => this.handleChange(event)}  value={this.state.password} validate type='password'><Icon>vpn_key</Icon></Input><br/>
                            </Col>
                            <Col s={12}>
                                {(this.props.localStorage.error)&&<Row className="error">{this.props.localStorage.error}</Row>}
                            </Col>
                        </Row>
                        <Row className="validateButton">
                            <Button onClick={(event) => this.handleSubmit(event)}  waves='light'>Se connecter</Button>
                        </Row>
                        <Row className='linkRegister'>
                            <a href="/register">S'enregistrer</a>
                        </Row>
                    </Card>
                </Row>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state)
    return ({
        localStorage: state.localStorage,
        users: state.users
    })
}

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps', dispatch)
    return {
        loginUser: (username, password) => {
            dispatch(loginUser(username, password))
        },
        editInputUser: () => {
            dispatch(editInputUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
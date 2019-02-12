import React, { Component } from 'react'
import {Card, CardTitle, Row, Input, Col, Button, Icon, Modal} from 'react-materialize';
import Logo from '../Login/img/logo-formation-diplomante.png';
import "./style.css";
import history from '../../helpers/history';

import { connect } from "react-redux";
import {registerUser,endRegisterUser} from '../../actions/userActions';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",//confirmation of password inscription
            profileUser: "teacher",//information of register user
            formValidate: false,//if formValidate is true we show error message if password and confirmPassword are differents
            confirmationRegisterModal: false,//is use to define if we open or close modal confirmation of user register
            user: {}
        }
    }

    componentDidUpdate(){
        console.log('update function')
        //if receive a register user we active and open modal confirmation
        if (this.props.users.register !== null && this.state.confirmationRegisterModal === false){
            this.setState({confirmationRegisterModal: true });
            console.log('activate modal',document.getElementById('registerButton'));
            //open modal
            document.getElementById('registerButton').click();

            var element = document.getElementsByClassName('modal open');
            // Iterate through the retrieved elements and add the necessary class names.
            for(var i = 0; i < element.length; i++)
            {
                //add new class to the modal
                element[i].classList.add('registerModal');
                //
                this.setState({modalClass: false})
                console.log(element[i].className);
            }
            
        }
    }

    //seizure of information to register formulaire
    handleChange = event => {
        event.preventDefault();
        console.log('value',event.target.value);
        this.setState({
            formValidate: false,
            [event.target.id]: event.target.value
        });
    }

    //new user register
    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            formValidate: true
        })
        var user = {
            username: this.state.username,
            password: this.state.password,
            profileUser: this.state.profileUser
        };
        if (this.state.username !== "" && this.state.password === this.state.confirmPassword){
            //save database the new user if user don't exist
            this.props.registerUser(user);
        }
    }

    //in modal of confirmation of new user register, redirection to login page
    valideConfirmationRegister = event => {
        this.setState({valideConfirmationRegister: false});
        this.props.endRegisterUser();
        //resolve bug modal-overlay who not close with the modal
        document.getElementById('materialize-modal-overlay-1').remove();
        document.body.style.overflow = 'auto';
        //Redirect to login page 
        history.push('/login');

    }

  render() {
    
    return (
        <div className="Register">
            <Card className='small'
                header={<CardTitle image={Logo}></CardTitle>}
            >
                <Row className="login-form">
                    <Col s={12}>
                        <Col s={1}></Col>
                        <Input s={10} id="username" label="Nom d'utilisateur" onChange={(event) => this.handleChange(event)} value={this.state.username}  validate><Icon>account_circle</Icon></Input>
                    </Col>
                    {/* Error is showing if user is already exist */}
                    {this.props.users.error !== null &&
                        <Row className="error">{this.props.users.error}</Row>
                    }
                    <Col s={12}>
                        <Col s={2}></Col>
                        <Input s={9} id="profileUser" type='select' label="Compte" defaultValue={this.state.profileUser} onChange={(event)=> this.handleChange(event)}>
                            <option value='teacher'>Enseignant</option>
                            <option value='student'>Elève</option>
                        </Input>
                    </Col>
                    <Col s={12}>
                        <Col s={1}></Col>
                        <Input s={10} id="password" label="Mot de passe" onChange={(event) => this.handleChange(event)}  value={this.state.password} validate type='password'><Icon>vpn_key</Icon></Input><br/>
                    </Col>
                    <Col s={12}>
                        <Col s={2}></Col>
                        <Input s={9} id="confirmPassword" label="Confirmer le mot de passe" onChange={(event) => this.handleChange(event)}  value={this.state.confirmPassword} validate type='password'></Input><br/>
                    </Col>
                    {/* Error is showing if the formulaire is completed and password and confirmation of password are differents */}
                    <Col s={12}>
                        {(this.state.password !== this.state.confirmPassword && this.state.formValidate === true)&&<Row className="error">Votre mot de passe de confirmation ne correspond pas au mot de passe que vous avez entré.</Row>}
                    </Col>
                    <Col s={12}>
                        <Button onClick={(event) => this.handleSubmit(event)}  waves='light'>S'enregistrer</Button>
                    </Col>
                </Row>
                <Row className="validateButton register">
                    <Modal
                        actions={
                            <Row className="footerBtn">
                                <Col s={6} className="right">
                                    <Button onClick={(event) => this.valideConfirmationRegister(event)}>
                                        S'identifier
                                    </Button>
                                </Col>
                            </Row>
                        }
                        header="Utilisateur créé avec succès"
                        // Button registerButton is not displayed. It is used to simulate click to open modal when the user completed the registration form
                        trigger={<Button id="registerButton">S'enregistrer</Button>}>
                    </Modal>
                </Row>
            </Card>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state)
    return ({
        users: state.users
    })
}

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps', dispatch)
    return {
        registerUser: (user) => {
           dispatch(registerUser(user))
        },
        endRegisterUser: () => {
            dispatch(endRegisterUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
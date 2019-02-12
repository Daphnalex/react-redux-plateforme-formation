import React, { Component } from 'react';
import {Row, Col} from "react-materialize";
import AddUserForm from "../components/User/addUserForm";

export default class Users extends Component {
  render() {
    return (
      <Row>
        <Col s={6} className='addUserForm'>
           <AddUserForm /> 
        </Col>
        <Col s={6} className='listUser'>
        
        </Col>
      </Row>
    )
  }
}

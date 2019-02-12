import React, { Component } from 'react'
import {Row,Col,Input} from "react-materialize";

export default class addUserForm extends Component {
  render() {
    return (
      <div>
        <Row>
            <Input s={6} label="Prénom" />
            <Input s={6} label="Nom" />
            <Input type="password" label="password" s={12} />
            <Input type="email" label="Email" s={12} />
            <Input s={6} label="Profil" />
            <Input s={6} label="Classe" />
        </Row>
      </div>
    )
  }
}

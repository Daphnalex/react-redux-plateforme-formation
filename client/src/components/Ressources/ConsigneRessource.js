import React, { Component } from 'react'
import { Row } from 'react-materialize';

export default class ConsigneRessource extends Component {
  render() {
    return (
    <Row>
        <label>
          Consigne :
          <input id="order" type="text" value={this.props.order} onChange={(event) => this.props.handleChange(event, null)} />
        </label>
      </Row>
    )
  }
}

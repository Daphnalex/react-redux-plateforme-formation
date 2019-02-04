import React, { Component } from 'react'
import { Row } from 'react-materialize';
import "./ressourceStyle.css";

export default class ConsigneRessource extends Component {
  render() {
    return (
    <Row>
        <label>
          Consigne :
          {this.props.seeRessource ?
            <div className="order">{this.props.order}</div>
          :
            <input id="order" type="text" value={this.props.order} onChange={(event) => this.props.handleChange(event, null)} />
          }
        </label>
      </Row>
    )
  }
}

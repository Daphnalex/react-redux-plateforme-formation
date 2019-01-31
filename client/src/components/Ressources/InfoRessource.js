import React, { Component } from 'react'
import { Row, Col, Button } from 'react-materialize';

export default class InfoRessource extends Component {
  render() {
    return (
    <div>
        <Row>
          <i>Indiquer un titre à votre QCM</i>
        </Row>
        <form>
          <Row>
            <label>
              Title :
            <input id="title" type="text" value={this.props.title} onChange={(event) => this.props.handleChange(event, null)} />
            </label>
          </Row>
          <Row>
            <label>
              Description :
            <input id="description" type="text" value={this.props.description} onChange={(event) => this.props.handleChange(event, null)} />
            </label>
          </Row>
          <Row>
            {this.props.title &&
              <Col s={6} className="btnNext right">
                <Button onClick={this.props.nextQuestion}><i className="material-icons">keyboard_arrow_right</i></Button>
              </Col>
            }
          </Row>
        </form>
      </div>
    )
  }
}

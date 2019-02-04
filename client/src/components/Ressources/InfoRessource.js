import React, { Component } from 'react'
import { Row, Col, Button } from 'react-materialize';
import "./ressourceStyle.css";

export default class InfoRessource extends Component {
  render() {
    return (
    <div>
        <Row>
          { !this.props.seeRessource &&
            <i>Indiquer un titre à votre {this.props.typeOfRessource}</i>
          }
        </Row>
        <form>
          <Row>
          {!this.props.seeRessource &&
            <label>
              Titre :
              <input id="title" type="text" value={this.props.title} onChange={(event) => this.props.handleChange(event, null)} />
            </label>
          }
          </Row>
          <Row>
          {this.props.seeRessource ?
                <h5>{this.props.description}</h5>
              :
            <label>
              Description :
                <input id="description" type="text" value={this.props.description} onChange={(event) => this.props.handleChange(event, null)} />
            </label>
          }
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

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button } from "react-materialize";
import Iframe from "react-iframe";
import './style.css';
import Support from "./SupportComponent";
import InfoRessource from "../InfoRessource";
import ConsigneRessource from "../ConsigneRessource";

export default class QCM extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    console.log("error",this.props.error)

    return (
      <div>
        {(this.props.modalPage === 0) ?
          <InfoRessource title={this.props.title} description={this.props.description} handleChange={this.props.handleChange} nextQuestion={this.props.nextQuestion}/>
          :
          <form>
              <ConsigneRessource order={this.props.order} handleChange={this.props.handleChange}/>
              <Support error={this.props.error} supportType={this.props.supportType} defineSupport={this.props.defineSupport} questions={this.props.questions} modalPage={this.props.modalPage} fileUploadHandler={this.props.fileUploadHandler} fileSelectedHandler={this.props.fileSelectedHandler} selectedFile={this.props.selectedFile} handleEditorChange={this.props.handleEditorChange}/>
              <Row>
                <label>
                  Question {this.props.modalPage} :
                  <input id="question" type="text" value={this.props.questions[this.props.modalPage - 1].question} onChange={(event) => this.props.handleChange(event, null)} />
                </label>
              </Row>
              <Row className="answers"><p>Propositions de réponses :</p>
                <i>Saisissez vos propositions de réponses et cochez les réponses justes.</i>
                <br /><br />
                {(this.props.questions[this.props.modalPage - 1].answers.length > 0)
                  &&
                  <div>
                    {(this.props.questions[this.props.modalPage - 1].answers.map((answer, index) => (
                      <Row key={index} className='answer'>
                        <input type={this.props.typeButton} id="validation" name="validation" onChange={(event) => this.props.handleChange(event, index)} checked={answer.validation} />
                        <label>
                          Réponse {index + 1}:
                          <input id="answer" type="text" value={this.props.questions[this.props.modalPage - 1].answers[index].answer} onChange={(event) => this.props.handleChange(event, index)} />
                        </label>
                      </Row>
                    )))}
                  </div>}
              </Row>
              <Row>
                <Button className="addAnswer center" onClick={this.props.addAnswer}>Ajouter une réponse</Button>
              </Row>
              <Row>
                {(this.props.modalPage > 0)
                  &&
                  <Col s={6} className="btnPrevious">
                    <Button onClick={this.props.previousQuestion}><i className="material-icons">keyboard_arrow_left</i></Button>
                  </Col>
                }
                <div>
                  {(this.props.modalPage === this.props.questions.length)
                    ?
                    <Col s={6} className="btnNext right">
                      <Button onClick={this.props.nextQuestion}>Ajouter une question</Button>
                    </Col>
                    :
                    <Col s={6} className="btnNext right">
                      <Button onClick={this.props.nextQuestion}><i className="material-icons">keyboard_arrow_right</i></Button>
                    </Col>
                  }
                </div>
              </Row>
            </form>
        }
      </div>
    )
  }
}

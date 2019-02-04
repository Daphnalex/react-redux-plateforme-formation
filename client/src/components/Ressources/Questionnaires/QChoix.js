import React, { Component } from 'react';
import { Row, Col, Button } from "react-materialize";
import './style.css';
import Support from "./SupportComponent";
import InfoRessource from "../InfoRessource";
import ConsigneRessource from "../ConsigneRessource";

export default class QCM extends Component {

  constructor(props) {
    super(props);
    this.testTypeValidation = this.testTypeValidation.bind(this);
  }

  testTypeValidation = () =>{
    console.log('typeOfRessource',this.props.typeOfRessource)
    if(this.props.typeOfRessource === "QCM") return "checkbox";
    if(this.props.typeOfRessource === "QCU") return "radio";
  }

  render() {
    return (
      <div>
        {(this.props.modalPage === 0) ?
          <InfoRessource seeRessource={this.props.seeRessource} typeOfRessource={this.props.typeOfRessource} title={this.props.title} description={this.props.description} handleChange={this.props.handleChange} nextQuestion={this.props.nextQuestion}/>
          :
          <form>
              <ConsigneRessource seeRessource={this.props.seeRessource} order={this.props.order} handleChange={this.props.handleChange}/>
              <Support deleteEditorChange={this.props.deleteEditorChange} seeRessource={this.props.seeRessource} error={this.props.error} supportType={this.props.supportType} defineSupport={this.props.defineSupport} questions={this.props.questions} modalPage={this.props.modalPage} fileUploadHandler={this.props.fileUploadHandler} fileSelectedHandler={this.props.fileSelectedHandler} selectedFile={this.props.selectedFile} handleEditorChange={this.props.handleEditorChange}/>
              <Row>
                <label>
                  Question {this.props.modalPage} :
                  { !this.props.seeRessource ?
                    <input id="question" type="text" value={this.props.questions[this.props.modalPage - 1].question} onChange={(event) => this.props.handleChange(event, null)} />
                  :
                    <div className="question">{this.props.questions[this.props.modalPage - 1].question}</div>
                  }
                  </label>
              </Row>
              <Row className="answers"><p>Propositions de réponses :</p>
                {!this.props.seeRessource ?
                   <i>Saisissez vos propositions de réponses et cochez les réponses justes.</i>
                   :
                  <i>Cochez la ou les réponses qui vous semblent justes</i>
                }
               
                <br /><br />
                {(this.props.questions[this.props.modalPage - 1].answers.length > 0)
                  &&
                  <div>
                    {(this.props.questions[this.props.modalPage - 1].answers.map((answer, index) => (
                      <div key={index}>
                        {!this.props.seeRessource ?
                          <Row className='answer'>
                            <input type={this.props.typeOfRessource === "QCM" ? "checkbox" : "radio"} id="validation" name="validation" onChange={(event) => this.props.handleChange(event,index)} checked={answer.validation} />
                            <label>
                              Réponse {index + 1}:
                              <input id="answer" type="text" value={this.props.questions[this.props.modalPage - 1].answers[index].answer} onChange={(event) => this.props.handleChange(event, index)} />
                            </label>
                        </Row>
                      :
                          <Row className='choiceUser'>
                            <input type={this.props.typeOfRessource === "QCM" ? "checkbox" : "radio"} id="choiceUser" name="choiceUser" onChange={(event) => this.props.handleChange(event,index)} checked={answer.choiceUser} />
                            <label>
                              Réponse {index + 1}:
                              <div>{this.props.questions[this.props.modalPage - 1].answers[index].answer}</div>
                            </label>
                          </Row>
                      }
                      </div>
                    )))}
                  </div>}
              </Row>
              {!this.props.seeRessource &&
                <Row>
                  <Button className="addAnswer center" onClick={this.props.addAnswer}>Ajouter une réponse</Button>
                </Row>
              }
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
                      {!this.props.seeRessource ?
                        <Button onClick={this.props.nextQuestion}>Ajouter une question</Button>
                        :
                        <Button onClick={(event)=>this.props.calculResult(event)}>Valider et obtenir mon résultat</Button>
                      }
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

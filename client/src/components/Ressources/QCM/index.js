import React, { Component } from 'react'
import { Row, Col, Button } from "react-materialize";
import Iframe from "react-iframe";
import './style.css';


export default class QCM extends Component {


  render() {
    console.log('QCM questions',this.props.questions)
    return (
      <div>
        {(this.props.modalPage === 0) ?
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
          :
          <div>
            <form>
              <Row>
                <label>
                  Consigne :
                  <input id="order" type="text" value={this.props.order} onChange={(event) => this.props.handleChange(event, null)} />
                </label>
              </Row>
              <Row>
                <label>
                  Support :
                </label>
                <Row>
                  <Col s={4}>
                    <Button className={this.props.supportType === "text" ? "choiceSupport active" : "choiceSupport"} id="text" onClick={(event) => this.props.defineSupport(event)}>Text</Button>
                    <Button className={this.props.supportType === "image" ? "choiceSupport active" : "choiceSupport"} id="image" onClick={(event) => this.props.defineSupport(event)}>Image</Button>
                    <Button className={this.props.supportType === "video" ? "choiceSupport active" : "choiceSupport"} id="video" onClick={(event) => this.props.defineSupport(event)}>Vidéo</Button>
                  </Col>
                </Row>
                <Row>
                  {(this.props.supportType === "text") &&
                    <div>Editeur de texte à mettre ici !!!!</div>
                  }
                  {(this.props.supportType === "image") &&
                    <div>
                      <input type='file' name='uploadFile' id='file' form='saveSupportFile' onChange={(event) => this.props.fileSelectedHandler(event)} />
                      <Button onClick={(event) => this.props.fileUploadHandler(event)}><i className="material-icons">cloud_upload</i> Télécharger</Button>
                    </div>
                  }
                  {(this.props.supportType === "video") &&
                    <div>Upload video ici !</div>
                  }
                  {(this.props.questions[this.props.modalPage - 1].supportType === 'image' && this.props.questions[this.props.modalPage - 1].supportPath !== "") &&
                   <div>
                     Rendu : <br/>
                    <img src={require(this.props.selectedFile)} alt="image support" />
                    </div>
                  }
                  
                </Row>
              </Row>
              <Row>
                <label>
                  Question {this.props.modalPage} :
                  <input id="question" type="text" value={this.props.questions[this.props.modalPage - 1].question} onChange={(event) => this.props.handleChange(event, null)} />
                </label>
              </Row>
              <Button className="addAnswer" onClick={this.props.addAnswer}>Ajouter une réponse</Button>
              <Row className="answers"><p>Propositions de réponses :</p>
                <i>Saisissez vos propositions de réponses et cochez les réponses justes.</i>
                <br /><br />
                {(this.props.questions[this.props.modalPage - 1].answers.length > 0)
                  &&
                  <div>
                    {(this.props.questions[this.props.modalPage - 1].answers.map((answer, index) => (
                      <Row key={index} className='answer'>
                        <input type="checkbox" id="validation" name="validation" onChange={(event) => this.props.handleChange(event, index)} checked={answer.validation} />
                        <label>
                          Réponse {index + 1}:
                          <input id="answer" type="text" value={this.props.questions[this.props.modalPage - 1].answers[index].answer} onChange={(event) => this.props.handleChange(event, index)} />
                        </label>
                      </Row>
                    )))}
                  </div>}
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
          </div>
        }
      </div>
    )
  }
}

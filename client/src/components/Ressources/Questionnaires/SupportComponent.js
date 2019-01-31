import React, { Component } from 'react'
import { Row, Col, Button } from "react-materialize";
import CKEditor from "react-ckeditor-component";

export default class SupportComponent extends Component {
    
  render() {
    return (
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
          {(this.props.questions[this.props.modalPage - 1].supportType === "image") &&
            <div>
              <input type='file' name='uploadImage' id='file' form='saveSupportFile' onChange={(event) => this.props.fileSelectedHandler(event)} />
              <Button onClick={(event) => this.props.fileUploadHandler(event)}><i className="material-icons">cloud_upload</i> Télécharger</Button>
            </div>
          }
          <br />
          {(this.props.questions[this.props.modalPage - 1].supportType === "video") &&
            <div>
              <input type='file' name='uploadVideo' id='fileUpload' form='saveSupportFile' onChange={(event) => this.props.fileSelectedHandler(event)} />
              <Button onClick={(event) => this.props.fileUploadHandler(event)}><i className="material-icons">cloud_upload</i> Télécharger</Button>
            
            </div>
          }
          {(this.props.questions[this.props.modalPage - 1].supportType === "text") &&
            <div>
              <CKEditor className='editorActive' id={this.props.questions[this.props.modalPage - 1]._id}
                activeClass="p10"
                content={this.props.questions[this.props.modalPage - 1].supportPath}
                events={{
                  "blur": this.onBlur,
                  "afterPaste": this.afterPaste,
                  "change": this.props.handleEditorChange
                }}
              />
            </div>
          }
          <br />
          {(this.props.questions[this.props.modalPage - 1].supportType === 'image' && this.props.questions[this.props.modalPage - 1].supportPath !== "") &&
            <div>
              <img className="supportImage center" src={this.props.questions[this.props.modalPage - 1].supportPath} alt="image support" />
            </div>
          }
          {(this.props.questions[this.props.modalPage - 1].supportType === 'video' && this.props.questions[this.props.modalPage - 1].supportPath !== "") &&
            <video className="supportVideo center" width="800" height="400" controls>
              <source src={this.props.questions[this.props.modalPage - 1].supportPath} type="video/mp4" />
            </video>
          }
          {(this.props.error && this.props.selectedFile === null) &&
            <div className='error'>
              <i>{this.props.error}</i>
            </div>
          }
        </Row>
      </Row>
    )
  }
}

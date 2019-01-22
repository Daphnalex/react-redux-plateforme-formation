import React, { Component } from 'react'
import { Row, Col, SideNav, SideNavItem, Modal, Button } from 'react-materialize';
import QCM from "./QCM";
import QCU from "./QCU";
import $ from 'jquery';
import {connect} from "react-redux";
import { addNewRessource } from "../../actions/ressourceActions";
import axios from "axios";

class AddRessource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            order: "",
            questions: [],
            modalPage: 0,
            typeOfRessource: "",
            shareRessource: false,
            author: localStorage.token.username,
            adding: this.props.adding,
            supportType: "",
            selectedFile: null,
            error: ""
        }
        this.defineSupport = this.defineSupport.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }

    handleChange = (event, index) => {
        //event.preventDefault();
        let newQuestions = Object.assign({}, this.state.questions);


        switch (event.target.id) {
            case 'answer':
                //change the state of answer according to his index
                newQuestions[this.state.modalPage - 1].answers[index].answer = event.target.value;
                this.setState({
                    newQuestions
                });
                break;
            case 'question':
                //change the state of answer according to his index
                newQuestions[this.state.modalPage - 1].question = event.target.value;
                this.setState({
                    newQuestions
                });
                break;
            case 'validation':
                newQuestions[this.state.modalPage - 1].answers[index].validation = event.target.checked;
                this.setState({
                    newQuestions
                });
                break;
            case 'shareRessource':
                newQuestions[this.state.modalPage - 1].answers[index].shareRessource = event.target.checked;
                this.setState({
                    newQuestions
                });
                break;
            default:
                this.setState({
                    [event.target.id]: event.target.value
                });
        }
    }

    nextQuestion = (event) => {
        event.preventDefault();
        console.log(this.state.modalPage);
        console.log(this.state.questions.length);
        // we test if modal is a new question or not
        if (this.state.modalPage === this.state.questions.length) {
            //We prepare the new question and reset question, support and answers elements.
            this.setState({
                questions: [...this.state.questions, {
                    supportType: "",
                    supportPath: "",
                    question: "",
                    answers: []
                }],
                defineSupport: "",
                selectedFile: ""
            }, function () {
                console.log('setState',this.state.questions)
                this.setState({
                    modalPage: this.state.modalPage + 1
                })
            })
        } else {
            this.setState({
                modalPage: this.state.modalPage + 1
            })
        }
    }

    previousQuestion = (event) => {
        event.preventDefault();
        this.setState({
            modalPage: this.state.modalPage - 1
        })
    }

    addAnswer = (event) => {
        event.preventDefault();
        //We prepare new answer to the current question
        let newQuestions = Object.assign([{}], this.state.questions);
        let newAnswers = newQuestions[this.state.modalPage - 1].answers;
        newAnswers = [...newAnswers, {
            answer: "",
            validation: false
        }]
        newQuestions[this.state.modalPage - 1].answers = newAnswers;
        this.setState({
            questions: newQuestions
        })
    }

    selectTypeOfRessource = (event) => {
        event.preventDefault();
        this.setState({
            typeOfRessource: event.target.id
        })
    }

    cancelModal = () => {
        this.setState({
            title: "",
            description: "",
            order: "",
            questions: [],
            modalPage: 0,
            typeOfRessource: "",
            shareRessource: false,
            author: localStorage.token.username
        }, function () {
            $(document).ready(function () {
                window.$('.modal').modal('close');
            });
        });
    }

    saveModal = () => {
        var ressource = {
            title: this.state.title,
            description: this.state.description,
            order: this.state.order,
            questions: this.state.questions,
            typeOfRessource: this.state.typeOfRessource,
            shareRessource: this.state.shareRessource,
            adding: true
        }
        this.props.addNewRessource(ressource);
        $(document).ready(function () {
            window.$('.modal').modal('close');
        });
    }

    fileUploadHandler(event) {
        event.preventDefault();
        const fd = new FormData();
        console.log('avant switch',this.state.supportType);
        switch(this.state.supportType){
            case ("image"):
                fd.append('uploadImage', this.state.selectedFile, this.state.selectedFile.name);
                axios.post('http://localhost:5001/api/uploadImage', fd, {
                    onUploadProgress: ProgressEvent => {
                        console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100))
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status === 200){
                        if (res.data.error){
                            this.setState({
                                error:  res.data.error.err,
                                selectedFile: null
                            })
                        } else {
                            let newQuestions = Object.assign([], this.state.questions);
                            let path = res.data.path;
                            console.log('path avant',path);
                            path = res.data.file.path.split('/');
                            path = path[2]+'/'+path[3];
                            console.log("path après",path)
                            newQuestions[this.state.modalPage - 1].supportPath = path;
                            newQuestions[this.state.modalPage - 1].supportType = this.state.supportType;
                            this.setState({
                                questions: newQuestions
                            });
                        }
                    }
                }).catch(err => {
                    console.log('err',err);
                });
            case('video'):
                console.log('video')
                fd.append('uploadVideo', this.state.selectedFile, this.state.selectedFile.name);
                axios.post('http://localhost:5001/api/uploadVideo', fd, {
                    onUploadProgress: ProgressEvent => {
                        console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100))
                    }
                }).then(res => {
                    console.log(res);
                    if (res.status === 200){
                        if (res.data.error){
                            this.setState({
                                error:  res.data.error.err,
                                selectedFile: null
                            })
                        } else {
                            let newQuestions = Object.assign([], this.state.questions);
                            let path = res.data.path;
                            console.log('path avant',path);
                            path = res.data.file.path.split('/');
                            path = path[2]+'/'+path[3];
                            console.log("path après",path)
                            newQuestions[this.state.modalPage - 1].supportPath = path;
                            newQuestions[this.state.modalPage - 1].supportType = this.state.supportType;
                            this.setState({
                                questions: newQuestions
                            });
                        }
                    }
                }).catch(err => {
                    console.log('err',err);
                });
        }
    }

    defineSupport(event){
        event.preventDefault();
        let newQuestions = Object.assign([], this.state.questions);
        newQuestions[this.state.modalPage - 1].supportType = event.target.id;
        console.log('choice', event.target.id);
        this.setState({
            supportType: event.target.id,
            questions: newQuestions
        })
    }

    fileSelectedHandler(event) {
        event.preventDefault();
        console.log('choice', event.target.files[0]);
        var value = event.target.files[0];
        console.log('value selectedFile',event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render() {
        return (
            <SideNav>
                <SideNavItem subheader>Ajouter une ressource</SideNavItem>
                <SideNavItem className="typeOfRessource">
                    <Modal
                        actions={
                            <Row className="footerBtn">
                                <Col s={6} className="left">
                                    <Button onClick={(event) => this.cancelModal(event)}>
                                        Annuler
                        </Button>
                                </Col>
                                <Col s={6} className="right">
                                    {
                                        ((this.state.title !== "") && (this.state.order !== "") && (this.state.questions.length > 0))
                                        &&
                                        <div className="right">
                                            <input type="radio" id="shareRessource" name="shareRessource" onChange={(event) => this.props.handleChange(event, null)} checked={this.state.shareRessource} />
                                            <label>
                                                Partager cette ressource
                                    </label>
                                            <Button onClick={(event) => this.saveModal(event)}>
                                                <i className="material-icons">exit_to_app</i>
                                                Enregistrer
                                    </Button>
                                        </div>
                                    }
                                </Col>
                            </Row>
                        }
                        header='Questionnaire à choix multiples'
                        trigger={<div><img src="/images/qcm_logo.png" alt="logo QCM" id='QCM' onClick={this.selectTypeOfRessource} /><div>QCM</div></div>}>
                        <QCM title={this.state.title} description={this.state.description} order={this.state.order} questions={this.state.questions} modalPage={this.state.modalPage} supportType={this.state.supportType} selectedFile={this.state.selectedFile} defineSupport={this.defineSupport} fileSelectedHandler={this.fileSelectedHandler} fileUploadHandler={this.fileUploadHandler} handleChange={this.handleChange} nextQuestion={this.nextQuestion} previousQuestion={this.previousQuestion} addAnswer={this.addAnswer} error={this.state.error} />
                    </Modal>
                </SideNavItem>
                <SideNavItem className="typeOfRessource">
                    <Modal
                        header='Questionnaire à choix uniques'
                        trigger={<div><img src="/images/qcu_logo.png" alt="logo QCU" /><div>QCU</div></div>}>
                        <QCU />
                    </Modal>
                </SideNavItem>
            </SideNav>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addNewRessource: (ressource) => {
            dispatch(addNewRessource(ressource))
        }
    }
}

export default connect(null, mapDispatchToProps) (AddRessource);
import React, { Component } from 'react'
import { Row, Col, SideNav, SideNavItem, Modal, Button } from 'react-materialize';
import QCM from "./QCM";
import QCU from "./QCU";
import $ from 'jquery';

export default class EditRessource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            order: "",
            questions: [],
            modalPage: 0,
            typeOfRessource: "",
            shareRessource: "",
            authorId: ""
        }
    }

    componentDidMount() {
        console.log('did mount', this.props.ressource);
        this.setState({
            title: this.props.ressource.title,
            description: this.props.ressource.description,
            order: this.props.ressource.order,
            questions: this.props.ressource.questions,
            modalPage: 0,
            typeOfRessource: this.props.ressource.typeOfRessource,
            shareRessource: this.props.ressource.shareRessource,
            authorId: this.props.ressource.authorId
        })
    }

    handleChange = (event, index) => {
        //event.preventDefault();
        let newQuestions = Object.assign({}, this.state.questions);


        switch (event.target.id) {
            case 'answer':
                //change the state of answer according to his index
                let questions1 = this.state.questions[this.state.modalPage - 1].answers[index].answer;
                questions1 = event.target.value;
                this.setState({
                    questions1
                });
                break;
            case 'question':
                //change the state of answer according to his index
                let questions2 = newQuestions[this.state.modalPage - 1].question
                questions2 = event.target.value;
                this.setState({
                    questions2
                });
                break;
            case 'validation':
                let questions3 = this.state.questions[this.state.modalPage - 1].answers[index].validation;
                questions3 = event.target.checked;
                this.setState({
                    questions3
                });
                break;
            case 'shareRessource':
                let questions4 = this.state.questions[this.state.modalPage - 1].answers[index].shareRessource;
                questions4 = event.target.checked;
                this.setState({
                    questions4
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
                    support: "",
                    question: "",
                    answers: []
                }]
            }, function () {
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
            typeOfRessource: ""
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
            shareRessource: this.state.shareRessource
        }
        this.props.addNewRessource(ressource);
        $(document).ready(function () {
            window.$('.modal').modal('close');
        });
    }

    
    render() {
        return (
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
                header={this.testHeaderRessource}
                trigger={<div><img src="/images/qcm_logo.png" alt="logo QCM" id='QCM' onClick={this.selectTypeOfRessource} /><div>QCM</div></div>}>
                {this.testContentRessource}
            </Modal>

        )
    }
}

import React, { Component } from 'react'
import { connect } from "react-redux";
import { Row, Col, SideNav, SideNavItem, Modal, Button } from 'react-materialize';
import QCM from "./QCM";
import QCU from "./QCU";
import $ from 'jquery';

class ListRessource extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            order: "",
            questions: [],
            modalPage: 0,
            shareRessource: null
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps);
    }

    handleChange = (event, index) => {
        //event.preventDefault();
        console.log('questions dans handleChange',this.state.questions)

        let newQuestions = Object.assign([], this.state.questions);
        console.log('newQuestions',newQuestions);

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
        console.log(this.state.questions);
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

    cancelModal = (ressource,index) => {
        this.setState({
            title: "",
            description: "",
            order: "",
            questions: [],
            modalPage: 0,
            typeOfRessource: "",
            shareRessource: null
        }, function () {
            $(document).ready(function () {
                window.$('.modal').modal('close');
            });
        });
    }

    saveModal = (ressource) => {
        var ressource = {
            title: ressource.title,
            description: ressource.description,
            order: ressource.order,
            questions: ressource.questions,
            shareRessource: ressource.shareRessource
        }
        this.props.addNewRessource(ressource);
        $(document).ready(function () {
            window.$('.modal').modal('close');
        });
    }

    editRessource = (ressource) => {
        this.setState({
            title: ressource.title,
            description: ressource.description,
            order: ressource.order,
            questions: ressource.questions,
            shareRessource: ressource.shareRessource
        })
    }

    deleteRessource = (ressource) => {

    }

    testHeaderRessource = (ressource) => {
        console.log('test header',ressource.typeOfRessource)
        switch(ressource.typeOfRessource){
            case "QCM":
                return "Questionnaire à choix multiples";
            case "QCU":
                return "Questionnaire à choix uniques";
        }
    }

    testContentRessource = (ressource) => {
        console.log('test content',ressource)
        console.log(this.state.questions)
        switch(ressource.typeOfRessource){
            case "QCM":
                return <QCM title={this.state.title ||ressource.title} description={this.state.description || ressource.description} order={this.state.order || ressource.order} questions={this.state.questions || ressource.questions} modalPage={this.state.modalPage} handleChange={this.handleChange} nextQuestion={this.nextQuestion} previousQuestion={this.previousQuestion} addAnswer={this.addAnswer} saveModal={this.saveModal} cancelModal={this.cancelModal}/>
            case "QCU":
                return <QCU title={ressource.title} description={ressource.description} order={ressource.order} questions={ressource.questions} modalPage={this.props.modalPage} handleChange={this.handleChange} nextQuestion={this.nextQuestion} previousQuestion={this.previousQuestion} addAnswer={this.addAnswer} />
        }
    }


    render() {
        console.log('render list',this.state.currentRessource)
        return (
            <div>
                <table className="centered striped">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Type de ressource</th>
                            <th></th>
                        </tr>
                    </thead>

                    {(this.props.ressources.ressources.length > 0) ?
                        <tbody>
                            {this.props.ressources.ressources.map((ressource, index) => (
                                <tr key={ressource}>
                                    <td>{ressource.title}</td>
                                    <td>{ressource.description}</td>
                                    <td>{ressource.typeOfRessource}</td>
                                    <td className="actionsRessourceList">
                                        <Modal
                                            actions={
                                                <Row className="footerBtn">
                                                    <Col s={6} className="left">
                                                        <Button onClick={(event) => this.cancelModal(ressource)}>
                                                            Annuler
                                                        </Button>
                                                    </Col>
                                                    <Col s={6} className="right">
                                                        {((ressource.title !== "") && (ressource.order !== "") && (ressource.questions.length > 0))
                                                            &&
                                                            <div className="right">
                                                                <input type="radio" id="shareRessource" name="shareRessource" onChange={(event) => this.props.handleChange(event, null)} checked={ressource.shareRessource} />
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
                                            header={this.testHeaderRessource(ressource)}
                                            trigger={<span>
                                                        <i className="material-icons" onClick={() => this.editRessource(ressource)}>edit</i>
                                                    </span>}>
                                            {this.testContentRessource(ressource)}
                                        </Modal>
                                        <Modal
                                            actions={
                                                <Row className="footerBtn">
                                                    <Col s={6} className="left">
                                                        <Button onClick={(event) => this.cancelModal(event)}>
                                                            Annuler
                                                    </Button>
                                                    </Col>
                                                    <Col s={6} className="right">
                                                        {((ressource.title !== "") && (ressource.order !== "") && (ressource.questions.length > 0))
                                                            &&
                                                            <div className="right">
                                                                <input type="radio" id="shareRessource" name="shareRessource" onChange={(event) => this.props.handleChange(event, null)} checked={ressource.shareRessource} />
                                                                <label>
                                                                    Partager cette ressource
                                                                </label>
                                                                <Button>
                                                                    <i className="material-icons">exit_to_app</i>
                                                                    Enregistrer
                                                                </Button>
                                                            </div>
                                                        }
                                                    </Col>
                                                </Row>
                                            }
                                            header={this.testHeaderRessource(ressource)}
                                            trigger={<span>
                                                        <i className="material-icons" onClick={() => this.deleteRessource(ressource)}>delete</i>
                                                    </span>}>
                                            {this.testContentRessource(ressource)}
                                        </Modal>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <td colSpan="4">Pas de ressources...</td>
                            </tr>
                        </tbody>
                    }


                </table>
            </div>
        )
    }
}

export default ListRessource;

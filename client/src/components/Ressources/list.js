import React, { Component } from 'react'
import { connect } from "react-redux";
import { Row, Col, SideNav, SideNavItem, Modal, Button } from 'react-materialize';
import QcmComponent from "./QCM";
import QcuComponent from "./QCU";
import $ from 'jquery';
import { getAllRessources, getRessource, editRessource } from "../../actions/ressourceActions";

class ListRessource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            order: "",
            questions: [],
            modalPage: 0,
            shareRessource: null,
            cancel: false,
            edition: false
        }
    }

    componentDidMount() {
        console.log('did mount')
        this.props.getAllRessources();
    }

    componentWillMount(){
        console.log('will mount')
    }

   

    componentDidUpdate(){
        console.log("did update");
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps)
    }

    componentDidUpdate() {
       if (this.state.edition === true && this.props.currentRessource !== null){
           console.log('edition',this.props);
           this.setState({
            title: this.props.currentRessource.title,
            description: this.props.currentRessource.description,
            order: this.props.currentRessource.order,
            questions: this.props.currentRessource.questions,
            modalPage: 0,
            shareRessource: this.props.currentRessource.shareRessource,
            edition: false
           })
       }

    }

    handleChange = (event, index) => {
        //event.preventDefault();
        let newQuestions = Object.assign([], this.state.questions);

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

    cancelModal = (ressource, index) => {
        console.log('ressource',ressource);
        this.props.getRessource(ressource);
        this.setState({
            cancel: true
        }, function () {
            $(document).ready(function () {
                window.$('.modal').modal('close');
            });
        });
    }

    saveModal = (ressource,index) => {
        console.log('ressource',this.state)
        var newRessource = {
            title: this.state.title,
            description: this.state.description,
            order: this.state.order,
            questions: this.state.questions,
            shareRessource: this.state.shareRessource,
            _id: ressource._id
        }
        console.log('newRessource', newRessource)
        this.props.editRessource(newRessource,index);
        $(document).ready(function () {
            window.$('.modal').modal('close');
        });
    }

    editRessource = (ressource) => {
        this.props.getRessource(ressource);
        this.setState({
            edition: true
        })
    }

    deleteRessource = (ressource) => {

    }

    testHeaderRessource = (ressource) => {
        switch (ressource.typeOfRessource) {
            case "QCM":
                return "Questionnaire à choix multiples";
            case "QCU":
                return "Questionnaire à choix uniques";
        }
    }


    render() {
        console.log('render', this.props.ressources)
        const components = {
            QcmComponent: QcmComponent,
            QcuComponent: QcuComponent
        };

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

                    {(this.props.ressources.length > 0) ?
                        <tbody>
                            {this.props.ressources.map((ressource, index) => (
                                <tr key={index}>
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
                                                                <Button onClick={() => this.saveModal(ressource,index)}>
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
                                            {(this.props.currentRessource !== null) &&
                                                <div key={ressource._id}>{React.createElement(components[`${ressource.typeOfRessource.charAt(0).toUpperCase()}${ressource.typeOfRessource.substr(1).toLowerCase()}Component`], { title: this.state.title, description: this.state.description, order: this.state.order, questions: this.state.questions, modalPage: this.state.modalPage, handleChange: this.handleChange, nextQuestion: this.nextQuestion, previousQuestion: this.previousQuestion, addAnswer: this.addAnswer, saveModal: this.saveModal, cancelModal: this.cancelModal }, null)}</div>
                                            }
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
                                            {(this.props.currentRessource !== null) &&
                                                <div key={ressource._id}>{React.createElement(components[`${ressource.typeOfRessource.charAt(0).toUpperCase()}${ressource.typeOfRessource.substr(1).toLowerCase()}Component`], { title: this.state.title, description: this.state.description, order: this.state.order, questions: this.state.questions, modalPage: this.state.modalPage, handleChange: this.handleChange, nextQuestion: this.nextQuestion, previousQuestion: this.previousQuestion, addAnswer: this.addAnswer, saveModal: this.saveModal, cancelModal: this.cancelModal }, null)}</div>
                                            }
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

const mapStateToProps = state => {
    return {
        ressources: state.ressources.ressources,
        currentRessource: state.ressources.currentRessource
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllRessources: () => {
            dispatch(getAllRessources())
        },
        getRessource: (ressource) => {
            dispatch(getRessource(ressource))
        },
        editRessource: (ressource,index) => {
            dispatch(editRessource(ressource,index))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (ListRessource);

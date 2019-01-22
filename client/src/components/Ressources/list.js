import React, { Component } from 'react'
import { connect } from "react-redux";
import { Row, Col, SideNav, SideNavItem, Modal, Button } from 'react-materialize';
import QcmComponent from "./QCM";
import QcuComponent from "./QCU";
import $ from 'jquery';
import { getAllRessources, getRessource, editRessource, deleteRessource } from "../../actions/ressourceActions";
import { addNewUpload } from '../../actions/uploadActions';
import axios from "axios";

class ListRessource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            order: "",
            questions: [],
            modalPage: 0,
            shareRessource: false,
            cancel: false,
            edition: false,
            supportType: "",
            selectedFile: "",
            error: ""
        }
        this.defineSupport = this.defineSupport.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }



    componentDidMount() {
        console.log('did mount')
        this.props.getAllRessources();
    }

    componentDidUpdate() {
        if (this.state.edition === true && this.props.currentRessource !== null) {
            console.log('edition', this.props);
            this.setState({
                title: this.props.currentRessource.title,
                description: this.props.currentRessource.description,
                order: this.props.currentRessource.order,
                questions: this.props.currentRessource.questions,
                modalPage: 0,
                shareRessource: this.props.currentRessource.shareRessource,
                edition: false,
                supportType: this.props.currentRessource.supportType,
                selectedFile: this.props.currentRessource.selectedFile
            })
        }

    }

    handleChange = (event, index) => {
        //event.preventDefault();
        let newQuestions = Object.assign([], this.state.questions);
        console.log('event.target.id', event.target.id)
        switch (event.target.id) {
            case 'answer':
                //change the state of answer according to his index
                newQuestions[this.state.modalPage - 1].answers[index].answer = event.target.value;
                this.setState({
                    questions: newQuestions
                });
                break;
            case 'support':
                console.log('support', event.target.value)
                //change the state of support according to his index
                newQuestions[this.state.modalPage - 1].support = event.target.value;
                this.setState({
                    questions: newQuestions
                });
                break;
            case 'question':
                //change the state of question according to his index
                newQuestions[this.state.modalPage - 1].question = event.target.value;
                this.setState({
                    questions: newQuestions
                });
                break;
            case 'validation':
                newQuestions[this.state.modalPage - 1].answers[index].validation = event.target.checked;
                this.setState({
                    questions: newQuestions
                });
                break;
            case 'shareRessource':
                console.log('dans switch shareRessource', event.target.checked);
                this.setState({
                    shareRessource: event.target.checked
                })
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
                    supportType: "",
                    supportPath: "",
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
        console.log('ressource', ressource);
        this.props.getRessource(ressource);
        this.setState({
            cancel: true
        }, function () {
            $(document).ready(function () {
                window.$('.modal').modal('close');
            });
        });
    }

    saveModal = (ressource, index) => {
        console.log('ressource', this.state)
        var newRessource = {
            title: this.state.title,
            description: this.state.description,
            order: this.state.order,
            questions: this.state.questions,
            shareRessource: this.state.shareRessource,
            supportType: this.state.supportType,
            selectedFile: this.state.selectedFile,
            _id: ressource._id
        }
        console.log('newRessource', newRessource)
        this.props.editRessource(newRessource, index);
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
        this.props.deleteRessource(ressource);
        $(document).ready(function () {
            window.$('.modal').modal('close');
        });
    }

    cancelDelete = (event) => {
        $(document).ready(function () {
            window.$('.modal').modal('close');
        });
    }

    testHeaderRessource = (ressource) => {
        switch (ressource.typeOfRessource) {
            case "QCM":
                return "Questionnaire à choix multiples";
            case "QCU":
                return "Questionnaire à choix uniques";
        }
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
        }
    }

    defineSupport(event){
        event.preventDefault();
        console.log('choice', event.target.id);
        this.setState({
            supportType: event.target.id
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
                                                                <input type="checkbox" id="shareRessource" name="shareRessource" onChange={(event) => this.handleChange(event, index)} checked={this.state.shareRessource} />
                                                                <label>
                                                                    Partager cette ressource
                                                                </label>
                                                                <Button onClick={() => this.saveModal(ressource, index)}>
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
                                                <div key={ressource._id}>{React.createElement(components[`${ressource.typeOfRessource.charAt(0).toUpperCase()}${ressource.typeOfRessource.substr(1).toLowerCase()}Component`], { title: this.state.title, description: this.state.description, order: this.state.order, questions: this.state.questions, modalPage: this.state.modalPage, handleChange: this.handleChange, nextQuestion: this.nextQuestion, previousQuestion: this.previousQuestion, addAnswer: this.addAnswer, saveModal: this.saveModal, cancelModal: this.cancelModal, addNewUpload: this.props.addNewUpload, supportType: this.state.supportType, defineSupport: this.defineSupport, fileUploadHandler: this.fileUploadHandler, fileSelectedHandler: this.fileSelectedHandler }, null)}</div>
                                            }
                                        </Modal>
                                        <Modal
                                            actions={
                                                <Row className="footerBtn">
                                                    <Col s={6} className="left">
                                                        <Button onClick={(event) => this.cancelDelete(event)}>
                                                            Annuler
                                                    </Button>
                                                    </Col>
                                                    <Col s={6} className="right">
                                                        <div className="right">
                                                            <Button onClick={() => this.deleteRessource(ressource, index)}>
                                                                <i className="material-icons">exit_to_app</i>
                                                                Supprimer
                                                                </Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            }
                                            header={"Avertissement"}
                                            trigger={<span>
                                                <i className="material-icons">delete</i>
                                            </span>}>
                                            Etes-vous sûr de vouloir supprimer cette ressource ?<br />
                                            <i>La suppression sera définitive.</i>
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
        editRessource: (ressource, index) => {
            dispatch(editRessource(ressource, index))
        },
        deleteRessource: (ressource) => {
            dispatch(deleteRessource(ressource))
        },
        addNewUpload: (upload, typeOf) => {
            dispatch(addNewUpload(upload, typeOf))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListRessource);

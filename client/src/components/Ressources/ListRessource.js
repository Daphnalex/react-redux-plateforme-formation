import React, { Component } from 'react'
import { connect } from "react-redux";
import { Row, Col, Modal, Button } from 'react-materialize';
import QChoixComponent from "./Questionnaires/QChoix";
import $ from 'jquery';
import { getAllRessources, getRessource, editRessource, deleteRessource } from "../../actions/ressourceActions";
import { addNewUpload } from '../../actions/uploadActions';
import axios from "axios";
import "./ressourceStyle.css";

class ListRessource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ressourceId: "", //general information
            title: "", //general information
            description: "", //general information
            order: "", //general information
            questions: [], //specific to questionnaires
            modalPage: 0, //general information
            shareRessource: false, //general information - teacher can share ressource with other teacher of the plateform
            edition: false,//if edition mode is true we update component with current ressource
            supportType: "", //general information for ressource having a support
            selectedFile: "", //define if support is a text, an image or a video
            error: "", //error to upload support
            activeEditor: false,
            seeRessource: false, //if seeRessource is true, user take activity we cancel edition of informations,
            score:"" //temp variable calculate score
        }
        this.defineSupport = this.defineSupport.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }

    componentDidMount() {
        //console.log('did mount')
        this.props.getAllRessources();
    }

    //if edition mode is activate we wait the response to get current Ressource. When we get it we update the state of our component
    componentDidUpdate() {
        console.log('ressourceId', this.state.ressourceId);

        if (this.state.edition === true && this.props.currentRessource !== null) {
            console.log('current id', this.props.currentRessource._id);
            if (this.props.currentRessource._id === this.state.ressourceId) {
                console.log('edition', this.props.currentRessource);
                this.setState({
                    ressourceId: this.props.currentRessource.ressourceId,
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
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps)
    }

    //------------------------------ SPECIFIC TO QUESTIONNAIRES --------------------
    //save informations the teacher write in the input of activity
    handleChange = (event, index) => {
        let newQuestions = Object.assign([], this.state.questions);
        switch (event.target.id) {
            case 'answer':
                newQuestions[this.state.modalPage - 1].answers[index].answer = event.target.value;
                this.setState({
                    questions: newQuestions
                });
                break;
            case 'support':
                newQuestions[this.state.modalPage - 1].support = event.target.value;
                this.setState({
                    questions: newQuestions
                });
                break;
            case 'question':
                newQuestions[this.state.modalPage - 1].question = event.target.value;
                this.setState({
                    questions: newQuestions
                });
                break;
            case 'validation':
                console.log('event', event.target);
                console.log('index', index)
                if (event.target.type === "radio") {
                    for (let i = 0; i < newQuestions[this.state.modalPage - 1].answers.length; i++) {
                        newQuestions[this.state.modalPage - 1].answers[i].validation = false;
                    }
                }
                newQuestions[this.state.modalPage - 1].answers[index].validation = event.target.checked;
                console.log(newQuestions[this.state.modalPage - 1].answers);
                this.setState({
                    newQuestions
                });
                break;
            case 'choiceUser':
                console.log('event', event.target);
                console.log('index', index)
                if (event.target.type === "radio") {
                    for (let i = 0; i < newQuestions[this.state.modalPage - 1].answers.length; i++) {
                        newQuestions[this.state.modalPage - 1].answers[i].validation = false;
                    }
                }
                newQuestions[this.state.modalPage - 1].answers[index].choiceUser = event.target.checked;
                console.log(newQuestions[this.state.modalPage - 1].answers);
                this.setState({
                    newQuestions
                });
                break;
            case 'shareRessource':
                this.setState({
                    shareRessource: event.target.checked
                })
                break;
            default:
                this.setState({
                    [event.target.id]: event.target.value
                });
                break;
        }
    }

    //this function allows to add a new answer for our question
    addAnswer = (event) => {
        event.preventDefault();
        //We prepare new answer to the current question
        let newQuestions = Object.assign([{}], this.state.questions);
        let newAnswers = newQuestions[this.state.modalPage - 1].answers;
        newAnswers = [...newAnswers, {
            answer: "",
            validation: false,
            choiceUser: false
        }]
        newQuestions[this.state.modalPage - 1].answers = newAnswers;
        this.setState({
            questions: newQuestions
        })
    }

    //-------------------------------------------------------------------------------

    // -------------------- FUNCTIONING TO THE MODAL -------------------------------
    //in modal this function allows to go to the next question
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

    //in modal this function allows to go to the previous question
    previousQuestion = (event) => {
        event.preventDefault();
        this.setState({
            modalPage: this.state.modalPage - 1
        })
    };

    //this function allows to cancel our current activity and close model
    cancelModal = (ressource, index) => {
        //console.log('ressource', ressource);
        this.setState({
            ressourceId: "",
            title: "",
            description: "",
            order: "",
            questions: [],
            modalPage: 0,
            shareRessource: false,
            edition: false,
            supportType: "",
            selectedFile: "",
            error: "",
            activeEditor: false,
            delete: false
        }, function () {
            $(document).ready(function () {
                window.$('.modal').modal('close');
            });
        });
    }

    //this function allows to save our current activity and close modal
    saveModal = (ressource, index) => {
        //console.log('ressource', this.state)
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

    //header for modal - this function allows to get the full name of the type of activity
    testHeaderRessource = (ressource) => {
        switch (ressource.typeOfRessource) {
            case "QCM":
                return "Questionnaire à choix multiples";
            case "QCU":
                return "Questionnaire à choix uniques";
            default:
                return "";
        }
    }

    // -----------------------------------------------------------------------------------

    // ----------------------------- ACTIONS FROM THE RESSOURCE ---------------------------------------
    //this function allows to activate the test mode
    seeRessource = (ressource) => {
        this.props.getRessource(ressource);
        this.setState({
            ressourceId: ressource._id,
            title: ressource.title,
            description: ressource.description,
            order: ressource.order,
            questions: ressource.questions,
            modalPage: 0,
            seeRessource: true
        })
    }

    //this function allows to edit the ressource
    editRessource = (ressource) => {
        console.log('ressource', ressource);
        this.props.getRessource(ressource);
        this.setState({
            ressourceId: ressource._id,
            title: ressource.title,
            description: ressource.description,
            order: ressource.order,
            questions: ressource.questions,
            modalPage: 1,
            shareRessource: ressource.shareRessource,
            edition: true
        })
    }

    //this function allows to delete the ressource
    deleteRessource = (ressource) => {
        this.props.deleteRessource(ressource);
        this.setState({
            delete: true
        },function(){
            $(document).ready(function () {
                window.$('.modal').modal('close');
            });
        })
        
    }

    //this function allows to cancel the suppression of the ressource
    cancelDelete = (event) => {
        $(document).ready(function () {
            window.$('.modal').modal('close');
        });
    }

    //training mode for resource : calcul result of user at the end of resource
    calculResult = (event) => {
        event.preventDefault();
        var score = 0;
        var scoreTemp;
        var total = this.state.questions.length;
        for(let i=0; i<this.state.questions.length; i++){
            for(let j=0; j<this.state.questions[i].answers.length; j++){
                if (this.state.questions[i].answers[j].validation === this.state.questions[i].answers[j].choiceUser){
                    scoreTemp = 1;
                } else {
                    scoreTemp = 0;
                    break;
                }
            }
            score = score + scoreTemp;
        }
        console.log("score à la fin",score+' / '+total);
    }
    // ------------------------------------------------------------------------------------------------

     //---------------------------- SPECIFIC TO ACTIVITY WITH SUPPORT -----------------------------------
    //this function recover the type of support - specific to activity need a support like questionnaires
    defineSupport = (event) => {
        event.preventDefault();
        //console.log('choice', event.target.id);
        this.setState({
            supportType: event.target.id
        })
    }
    // --------------------------------------------------------------------------------------------------

    // ---------------------------------- SPECIFIC TO UPLOAD FILE ---------------------------------------
    //this function is to manage the upload of image or video to support of activity
    fileUploadHandler = (event) => {
        event.preventDefault();
        const fd = new FormData();
        console.log('avant switch', this.state.supportType);
        switch (this.state.supportType) {
            //upload image
            case ("image"):
                fd.append('uploadImage', this.state.selectedFile, this.state.selectedFile.name);
                axios.post('http://localhost:5001/api/uploadImage', fd, {
                    onUploadProgress: ProgressEvent => {
                        console.log('Upload Image Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100))
                    }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.error) {
                            this.setState({
                                error: res.data.error.err,
                                selectedFile: null
                            })
                        } else {
                            let newQuestions = Object.assign([], this.state.questions);
                            let path = res.data.resizePath;
                            newQuestions[this.state.modalPage - 1].supportPath = path;
                            newQuestions[this.state.modalPage - 1].supportType = this.state.supportType;
                            this.setState({
                                questions: newQuestions
                            });
                        }
                    }
                }).catch(err => {
                    console.log('err', err);
                });
                break;
            //upload video
            case ('video'):
                fd.append('uploadVideo', this.state.selectedFile, this.state.selectedFile.name);
                axios.post('http://localhost:5001/api/uploadVideo', fd, {
                    onUploadProgress: ProgressEvent => {
                        console.log('Upload Video Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100))
                    }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.error) {
                            console.log('res.data.error', res.data.error)
                            this.setState({
                                error: res.data.error.message,
                                selectedFile: null
                            })
                        } else {
                            let newQuestions = Object.assign([], this.state.questions);
                            let path = res.data.path;
                            path = res.data.file.path.split('/');
                            path = path[2] + '/' + path[3];
                            newQuestions[this.state.modalPage - 1].supportPath = path;
                            newQuestions[this.state.modalPage - 1].supportType = this.state.supportType;
                            this.setState({
                                questions: newQuestions
                            });
                        }
                    }
                }).catch(err => {
                    console.log('err', err);
                });
                break;
            default: 
                break;
        }
    }

    //to upload file we recover the file selected in input with file type
    fileSelectedHandler = (event) => {
        event.preventDefault();
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    // --------------------------------------------------------------------------------------------------

    // ---------------------------------- SPECIFIC TO CKEDITOR ------------------------------------------
    //we recover the content of editor
    handleEditorChange = (event) => {
        event.preventDefault();
        //console.log("onChange fired with event info: ", event);
        var newContent = event.editor.getData();
        let newQuestions = Object.assign([], this.state.questions);
        newQuestions.supportPath = newContent;
        this.setState({
            questions: newQuestions
        })
    }
    //function block modification of content 
    deleteEditorChange = (event) => {
        let newQuestions = Object.assign([], this.state.questions);
        newQuestions.supportPath = this.state.questions[this.state.modalPage].supportPath;
        this.setState({
            questions: newQuestions
        })
    }
    // --------------------------------------------------------------------------------------------------

    render() {
        console.log('render', this.props.ressources)
        const components = {
            QcmComponent: QChoixComponent,
            QcuComponent: QChoixComponent
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
                                                <div key={ressource._id}>{React.createElement(components[`${ressource.typeOfRessource.charAt(0).toUpperCase()}${ressource.typeOfRessource.substr(1).toLowerCase()}Component`], { typeOfRessource: ressource.typeOfRessource, title: this.state.title, description: this.state.description, order: this.state.order, questions: this.state.questions, modalPage: this.state.modalPage, handleChange: this.handleChange, nextQuestion: this.nextQuestion, previousQuestion: this.previousQuestion, addAnswer: this.addAnswer, saveModal: this.saveModal, cancelModal: this.cancelModal, addNewUpload: this.props.addNewUpload, supportType: this.state.supportType, defineSupport: this.defineSupport, fileUploadHandler: this.fileUploadHandler, fileSelectedHandler: this.fileSelectedHandler, handleEditorChange: this.handleEditorChange }, null)}</div>
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
                                        <Modal
                                            actions={
                                                <Row className="footerBtn">
                                                    <Col s={6} className="left">
                                                        <Button onClick={(event) => this.cancelModal(ressource)}>
                                                            Annuler
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            }
                                            header={ressource.title}
                                            trigger={<span>
                                                <i className="material-icons" onClick={() => this.seeRessource(ressource)}>visibility</i>
                                            </span>}>
                                            {(this.props.currentRessource !== null) &&
                                                <div key={ressource._id}>{React.createElement(components[`${ressource.typeOfRessource.charAt(0).toUpperCase()}${ressource.typeOfRessource.substr(1).toLowerCase()}Component`], { calculResult:this.calculResult, seeRessource: this.state.seeRessource, typeOfRessource: ressource.typeOfRessource, title: this.state.title, description: this.state.description, order: this.state.order, questions: this.state.questions, modalPage: this.state.modalPage, handleChange: this.handleChange, nextQuestion: this.nextQuestion, previousQuestion: this.previousQuestion, addAnswer: this.addAnswer, saveModal: this.saveModal, cancelModal: this.cancelModal, addNewUpload: this.props.addNewUpload, supportType: this.state.supportType, defineSupport: this.defineSupport, fileUploadHandler: this.fileUploadHandler, fileSelectedHandler: this.fileSelectedHandler, handleEditorChange: this.handleEditorChange , deleteEditorChange: this.deleteEditorChange}, null)}</div>
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
    console.log('ressources mapStateToProps', state.ressources.ressources)
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

import React, { Component } from 'react';
import { Row, Col} from 'react-materialize';
import { connect } from "react-redux";
import { getAllRessources, addNewRessource, getRessource, editRessource } from "../../actions/ressourceActions";
import AddRessource from './add';
import ListRessources from './list';
import './style.css';


class Ressources extends Component {

    render() {
        console.log('index render',this.props.currentRessource)
        return (
            <Row>
                <Col s={12} m={3}>
                    <AddRessource addNewRessource={this.props.addNewRessource} />
                </Col>
                <Col s={12} m={9}>
                    <ListRessources ressources={this.props.ressources.ressources} getAllRessources={this.props.getAllRessources} currentRessource={this.props.currentRessource} getRessource={this.props.getRessource} editRessource={this.props.editRessource}/>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        ressources: state.ressources,
        currentRessource: state.ressources.currentRessource
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllRessources: () => {
            dispatch(getAllRessources())
        },
        addNewRessource: (ressource) => {
            dispatch(addNewRessource(ressource))
        },
        getRessource: (ressource) => {
            dispatch(getRessource(ressource))
        },
        editRessource: (ressource) => {
            dispatch(editRessource(ressource))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ressources)
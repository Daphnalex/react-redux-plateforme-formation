import React, { Component } from 'react';
import { Row, Col} from 'react-materialize';
import { connect } from "react-redux";
import { getAllRessources, addNewRessource } from "../../actions/ressourceActions";
import AddRessource from './add';
import ListRessources from './list';
import './style.css';


class Ressources extends Component {
    

    componentDidMount(){
        this.props.getAllRessources()
    }

    render() {

        return (
            <Row>
                <Col s={12} m={3}>
                    <AddRessource addNewRessource={this.props.addNewRessource} />
                </Col>
                <Col s={12} m={9}>
                    <ListRessources ressources={this.props.ressources} getRessource={this.props.getRessource} />
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        ressources: state.ressources
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllRessources: () => {
            dispatch(getAllRessources())
        },
        addNewRessource: (ressource) => {
            dispatch(addNewRessource(ressource))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ressources)
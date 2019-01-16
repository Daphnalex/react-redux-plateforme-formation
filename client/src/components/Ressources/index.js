import React, { Component } from 'react';
import { Row, Col} from 'react-materialize';
import AddRessource from './add';
import ListRessources from './list';
import './style.css';


class Ressources extends Component {
    constructor(props){
        super(props);
        this.state = {
            adding: false
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('nextprops index',nextProps);
    }

    render() {
        console.log('index render',this.props.currentRessource)
        return (
            <Row>
                <Col s={12} m={3}>
                    <AddRessource addNewRessource={this.props.addNewRessource} getAllRessources={this.props.getAllRessources} adding={this.state.adding}/>
                </Col>
                <Col s={12} m={9}>
                    <ListRessources getAllRessources={this.props.getAllRessources} currentRessource={this.props.currentRessource} getRessource={this.props.getRessource} editRessource={this.props.editRessource}/>
                </Col>
            </Row>
        )
    }
}

export default Ressources;
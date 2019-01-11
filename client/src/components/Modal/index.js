import React, { Component } from 'react';
import { Modal } from "react-materialize";
import QCM from "../QCM";
import QCU from "../QCU";

export default class ModalComponent extends Component {

    testTypeOfActivity = (activity) => {
        switch(activity){
            case "QCM":
                return <QCM />
            case "QCU":
                return <QCU />
            default:
                return;
        }
    }

    render() {
        return (
            <div>
                <Modal>
                    {()=>this.testTypeOfActivity(this.props.typeOfActivity)}
                </Modal>
            </div>
        )
    }
}

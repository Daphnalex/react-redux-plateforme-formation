import React, { Component } from 'react';
import { Row, Col, SideNav, SideNavItem, Modal } from 'react-materialize';
import { connect } from "react-redux";
import { getAllRessources } from "../../actions/ressourceActions";
import './style.css';
import QCM from "../QCM";

class Ressources extends Component {

    componentDidMount() {
        console.log('entre ici')
        this.props.getAllRessources();
    }

   

    render() {

        return (
            <Row>
                <Col s={12} m={4}>
                <SideNav>
                    <SideNavItem subheader>Ajouter une ressource</SideNavItem>
                    <SideNavItem className="typeOfRessource" onClick={()=>this.addRessource("QCM")}>
                        <Modal
                            header='Questionnaire à choix multiples'
                            trigger={<div><img src="/images/qcm_logo.png"/><div>QCM</div></div>}>
                            <QCM />
                        </Modal>
                    </SideNavItem>
                    <SideNavItem className="typeOfRessource" onClick={()=>this.addRessource("QCU")}><img src="/images/qcu_logo.png"/><div>QCU</div></SideNavItem>
                </SideNav>
                </Col>
                <Col s={12} m={6}>

                </Col>
            </Row>
                )
              }
            }
            
const mapStateToProps = state => {
                    console.log("ressources page", state)
    return {
                    ressources: state.ressources
            }
        }
        
const mapDispatchToProps = dispatch => {
    return {
                    getAllRessources: () => {
                        dispatch(getAllRessources())
                    }
                }
            }
            
export default connect(mapStateToProps, mapDispatchToProps) (Ressources)

import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"


export default class FlatlyPopup extends React.Component{
    state = {
        styles:{
            warning: { backgroundColor:"orange", color:"white" },
            danger: { backgroundColor:"red", color:"white" },
            success: { backgroundColor:"green", color:"black" },
        }
    }

    render(){
        return(
            <Modal
                show={this.props.showModal}
                onHide={this.props.hideModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header 
                    style={ this.state.styles[this.props.modalStyle] }
                    closeButton
                >
                    {/* <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title> */}
                </Modal.Header>
                <Modal.Body
                    style={ this.state.styles[this.props.modalStyle] }
                >
                    <h4>{ this.props.modalTitle }</h4>
                    <p>{ this.props.modalBody }</p>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button 
                        onClick={ ()=>this.props.hideModal() }
                    >
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        )
    }
}

/**
    <FlatlyPopup
        showModal={ this.state.showModal }
        modalTitle={ this.state.modalTitle }
        modalBody={ this.state.modalBody }
        hideModal={ ()=>this.setState({showModal: false}) }
    />
*/



import React from "react"
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Alert"


export default class FlatlyAlert extends React.Component{
    state = {}

    render(){
        return(
            <Alert 
                variant="danger" 
                show={ this.props.showModal }
                onClose={ () => this.props.dismissAlert() } 
                dismissible
            >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                Change this and that and try again. Duis mollis, est non commodo
                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                Cras mattis consectetur purus sit amet fermentum.
                </p>
            </Alert>
        )
    }
}

/**
    <FlatlyAlert
        showModal={ this.state.showModal }
        modalTitle={ this.state.modalTitle }
        modalBody={ this.state.modalBody }
        dismissAlert={ ()=>this.setState({showModal: false}) }
    />
*/


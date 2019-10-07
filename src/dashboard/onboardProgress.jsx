//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";
import '@y0c/react-datepicker/assets/styles/calendar.scss';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

import  * as Rule from "../dashboard/colouringFunctions"
import { pipelineSteps } from "../common/constants"
import { IconButton, Stepper, Step, StepLabel } from "@material-ui/core";
import StepConnector from '@material-ui/core/StepConnector';
import InfoIcon from '@material-ui/icons/Info';

const ColorlibConnector = withStyles({
	alternativeLabel: {
	  top: 22,
	},
	active: {
	  '& $line': {
		backgroundImage:
		  'linear-gradient( 0deg,rgb(0,0,0) 0%,rgb(0,0,0) 50%,rgb(0,0,0) 100%)',
	  },
	},
	completed: {
	  '& $line': {
		backgroundImage:
		  'linear-gradient( 0deg,rgb(0,0,0) 0%,rgb(0,0,0) 50%,rgb(0,0,0) 100%)',
	  },
	},
	line: {
	  height: 3,
	  border: 0,
	  backgroundColor: '#eaeaf0',
	  borderRadius: 1,
	},
  })(StepConnector);

class onboardProgress extends Component {
	state = {
		isOpen: false,
		steps: pipelineSteps,
		activeStep: 2,
	}

	showDiv = {
		display: "block"
	}

	hideDiv = {
		display: "none"
	}

  	render() {
		//console.log('onboardPopup: Rendering cell content');
		return (
			<React.Fragment>
				<IconButton 
					size="small"
					onClick={ ()=>this.setState({isOpen: true}) }
					//onMouseEnter={ this.handlePop }
					//onMouseLeave={ this.handlePop }
				>
					<InfoIcon fontSize="small" />
                </IconButton>

				<div
					style={ this.hideDiv }

				>uuuuuuuuuuuuuuuuuuuuuuuu
				</div>

				<Dialog
                    open={this.state.isOpen}
					onClose={this.closePopUp}
					//onMouseLeave={ ()=>this.setState({isOpen: false}) }
                    aria-labelledby="draggable-dialog-title"
                >
					<DialogTitle 
						id="draggable-dialog-title" 
						style={
							{ padding: "18px 24px 16px 24px" }
						}
                    >
                        Onboarding status for { this.props.hospital_name }
                    </DialogTitle>

                    <DialogContent>
						<React.Fragment>
						{
							(this.props.pipelineData && this.props.pipelineData.stage_id) &&
							<div>
								<div >
									<Stepper 
										alternativeLabel 
										activeStep={ this.state.steps.findIndex( s => (s.id === this.props.pipelineData.stage_id) ) } 
										connector={<ColorlibConnector />}
									>
										{ 
											this.state.steps.map( (step, i) => (
												<Step 
													key={ i }
													//key={step.stage_id}
												>
													<StepLabel >{step.label}</StepLabel>
												</Step>
											))
										}
									</Stepper>
								</div>
							</div>
						}
						</React.Fragment>
					</DialogContent>

					<DialogActions>
						<Button
							onClick={ ()=>this.setState({isOpen: false}) }
						>
							Close
						</Button>
					</DialogActions>
				</Dialog>
					
			</React.Fragment>
		)
	}

	handlePop = () => {
		let currentState = this.state.isOpen;
		this.setState({isOpen: !currentState });
	}

	componentDidMount(){
		console.log("onboardPopup didmount props:", this.props);

	}

}


const mapStateToProps = (state, props) => {
	//console.log('onboardPopup.jsx-mapStateToProps', state);
	console.log('onboardPopup.jsx-props1', props);

	let ticketData = state.ticketsDataReducer.ticketsData.find( ticket => (
		ticket.ticket_id === props.ticket_id
	) );

	if(ticketData && ticketData.hs_pipeline_stage && ticketData.hs_pipeline_stage.stage_id){
		return{
			pipelineData: ticketData.hs_pipeline_stage
		}
	}
	return {
		pipelineData: null
	}
}


export default connect(mapStateToProps)(onboardProgress);



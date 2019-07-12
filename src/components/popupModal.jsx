import React, { Component } from "react";

// https://react-day-picker.js.org/
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";
import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import '@y0c/react-datepicker/assets/styles/calendar.scss';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


import { rootStore } from "../stores/mainStore";
import { MenuItem, RadioGroup, FormControlLabel, FormGroup } from "@material-ui/core";

//import Checkbox from "./checkBoxComp";

//export default class PopDialog extends Component {
class PopDialog extends Component {
	state = {
		/** record id. need in dispatching */	identifier		:this.props.identifier,
		/** property value */     				attributeValue	:this.props.value,
		/** property name */      				attributeName	:this.props.property,
		/** element input type */ 				elementType		:this.props.elementType,
		/** Detect popup modal open state */	isOpen			:false,
		/** temporary day to keep calendar selected date */ tempDayCal: this.props.value,
		/** data location Hubspot / DB */		dataLocation: 'db', //hubspot data not edited!
	}

	styleTD={
		width: "100%" ,
		minHeight: "18px",
		color: "#111111"
	}

	styleMatUI={
		closeButton: {
			cursor:'pointer', 
			float:'right', 
			marginTop: '5px', 
			width: '20px',
			align: 'right'
		},

		titleBarThin:{
			padding: "0 24 0 24"
		},

		titleBarPrimary:{
			color:"white", "backgroundColor":"#3c4fb0"
		}
	}
	

  openPopUp = () => {
    this.setState({ isOpen: true });
  };

  closePopUp = () => {
    this.setState({ isOpen: false });
	};
	

  render() {
		return (
			<React.Fragment>
				{	this.showPop(0) }
			</React.Fragment>
		)
	}

	showPop( optionalAttribute1 ){
		return(
			<div style={ { minWidth: "20px", minHeight: "18px" } }>
				<div style={this.styleTD} 
					onClick={ ()=>{ 
						this.openPopUp();
						console.log( "Popoup clicked: ",this ); 
					} } >

					{ this.props.value } 
				</div>


				<Dialog
					open={this.state.isOpen}
					onClose={this.closePopUp}
					aria-labelledby="draggable-dialog-title"
				>
					{/* <AppBar position="relative" ></AppBar> */}
					<DialogTitle id="draggable-dialog-title" 
					style={
						{ ...this.styleMatUI.titleBarPrimary,  padding: "18px 24px 16px 24px" }
					}
					>

						Change { this.state.attributeName }

					</DialogTitle>

					<DialogContent>

							{ this.makeInputElements() }
						
					</DialogContent>

					<DialogActions>
						<Button onClick={ ()=>{
								this.setState({ attributeValue: this.props.value });
								this.closePopUp() 
							} }
							style={ this.styleMatUI.closeButton }	
							variant="text"
							color="primary"
						>
								{ /* Close button svg icon from material UI documentation * }
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
									viewBox="0 0 18 18">
									<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
								</svg> */}
								Cancel
						</Button>
											
						<Button onClick={ () => { 
								//this.setState({ attributeValue:this.state.attributeValue });
								this.dispatchUpdate()
								this.closePopUp(); 
							} } 
							variant="text" color="primary"
							style={this.styleMatUI.closeButton} >OK
						</Button>

						
					</DialogActions>
				</Dialog>
			
			</div>
		);
		
	}

	// update the store
	dispatchUpdate = () => {
		rootStore.dispatch({
			type: 'UPDATE_PET_DETAIL',
			payload: {
				identifier: this.state.identifier,
				attribute: this.state.attributeName,
				value: this.state.attributeValue
			}
		});
	}

	makeInputElements= () =>{
			switch (this.state.elementType) {
				case "text": case "number":
					return(
						<TextField
							label={ this.state.attributeName }
							value={this.state.attributeValue}
							onChange={ e => (
								e.preventDefault(),
								this.setState({ attributeValue: e.target.value })
								) }

							type={ this.state.elementType }
						/>
					);

					case "select":
						return (
							<React.Fragment>
								<br />
								<Select value={ this.state.attributeValue } 
									onChange={ e => this.setState({ attributeValue: e.target.value }) }
									fullWidth={true}
								>
									{
										this.props.data.valueSet.map( item =>
												<MenuItem key={ item.value } value={ item.value } >{ item.label }</MenuItem>
											)
									}
								</Select>
							</React.Fragment>
						);

					case "radio":
						return (
							<RadioGroup
								name="genderSelect"
								value={ this.state.attributeValue }
								onChange={ (e)=>{
									this.setState({ attributeValue: e.target.value});
									console.log(e)
									}
								}
							>	
								{ this.props.data.valueSet.map( val => (
									<FormControlLabel
										key={val}
										value={ val }
										control={<Radio color="primary" />}
										label={ val }
										labelPlacement="end"
										/>
									)
								)}
								
							</RadioGroup>
						);

				case "checkBox":
					return(
						<FormGroup>
							{this.props.data.valueSet.map( (val, index) => (
								<div key={index} >
									<FormControlLabel
										control={ 
											<Checkbox
												key={index}
												checked={
													this.state.attributeValue.includes( val.name)/**/
												}
												onChange={ (e)=>{
													if(e.target.checked){
															this.setState({
																	attributeValue: [...this.state.attributeValue, e.target.value]
															})
													}
													else{ 
															var index = this.state.attributeValue.indexOf(e.target.value);
															if (index > -1) {
																//prevState.list.filter( itm=> itm != index);
																let newArr = [...this.state.attributeValue]; //
																	newArr.splice(index, 1);
																	this.setState({
																			attributeValue: newArr
																	})
															} 
													}
												}}

												value={val.name}
												color="primary"
											/>
										}
										style={ { width: "100%" } }
										label={ val.value }
									>
									</FormControlLabel>

								</div>
							)
							)}
						</FormGroup>
					);

				case "date":
					return(
						<MuiPickersUtilsProvider utils={DateFnsUtils} onClick={() =>  this.setState({ isOpen: true}) }>
							<DatePicker
								autoFocus = { false }
								//onlyCalendar
								//variant="inline"
								format="yyyy/MM/dd"
								label="Pet admitted date"
								//helperText="No year selection"
								value={ this.state.attributeValue }
								onChange={ this.changeDatepickerValue }
								onAccept={ this.acceptDatepickerValue }
								open={ this.state.isOpen }
								onOpen={ this.openDatepicker }
        				onClose={ this.closeDatepicker }
        				onClick={ this.openDatepicker }
							/>
							</MuiPickersUtilsProvider>
					);
				
				default:
					console.log("invalid case");
					break;
			}
	}

	openDatepicker = () => {
		this.setState({ isOpen: true})
	}
	closeDatepicker = () => {
		this.setState({ isOpen: false})
	}
	changeDatepickerValue = (selectedDate) => {
		this.setState({ attributeValue: format(new Date(selectedDate), 'yyyy-MM-dd') });
	}

	acceptDatepickerValue = () => {
		this.dispatchUpdate();
	}

}

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

function PaperComponent0(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}


export default PopDialog;
//export default withStyles(styles)(PopDialog);
//export default withStyles()(PopDialog);


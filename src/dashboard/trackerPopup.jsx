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

import Popup from "reactjs-popup";

import TableCell from '@material-ui/core/TableCell';

import { connect } from "react-redux";
import rootReducer from "../reducers/index";

import { rootStore } from "../stores/pets";
import { MenuItem, RadioGroup, FormControlLabel, FormGroup } from "@material-ui/core";

//import Checkbox from "./checkBoxComp";

//export default class PopDialog extends Component {
class PopDialog extends Component {
	state = {
		/** trackerInstaid. need in dispatching */	trackerInstanceIdId		:this.props.trackerInstanceId,
		/** column id. need in dispatching */	columnId		:this.props.columnId,
		/** property value */     				attributeValue	:this.props.instanceData.value,
		/** property name */      				attributeName	:this.props.property,
		/** element input type */ 				elementType		:this.props.elementType,
		/** Detect popup modal open state */	isOpen			:false,
		//** temporary day to keep calendar selected date */ tempDayCal: this.props.value,
		//** data location Hubspot / DB */		dataLocation: 'db', //hubspot data not edited!
	}

	/** 
	 * defined by columnId
	 * 
	 * columnId: { predefined value set }
	 * */
	columnPredefinedValues ={
		1: null,				// clinic name

		4: 0,					// RF sent date
		5: null,				// RF completed date
		6: [ { name:true, value:"OK" }, { name:false, value:"NotCompleted"} ],		// completed status
		7: 24					// total duration
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

  	render() {
		return (
			<React.Fragment>
				{	this.showPop(0) }
			</React.Fragment>
		)
	}

	showPop( optionalAttribute1 ){
		if(this.state.elementType ==="date")
		return(
			<TableCell style={ { minWidth: "20px", minHeight: "18px" } }>
				<div style={this.styleTD}
					
					onClick={ ()=>{ 
						if(this.state.elementType ==="date")
							this.openPopUp();
						else{
							return(<Popup trigger={ <span > { this.state.attributeValue }  </span>  } position="bottom left">
								{close => (
									<div>
										<a href="#" className="close" onClick={close}> &times; </a>
										{ /*this.tempValue=this.state.name*/ }
										<b>Change Name</b> <br/>
										<input type="text" name="txtName" value={this.state.name} 
											onChange={ e => this.setState({ name: e.target.value }) }  /> <br/>

										<a onClick={close} >
											<button onClick={ () => { this.setState({ name:this.state.name }); } } className="btn btn-sm btn-link" >OK</button>
										</a>
										{<a onClick={close} >
											<button onClick={ () => this.setState({ name:this.props.name }) } className="btn btn-sm btn-link" >Cancel</button>
										</a>}
									</div>
								)}
							</Popup>)
						}
						//console.log( "Popoup clicked: ",this ); 
					} } 
				>
					{ String(this.props.instanceData.value) }


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
								this.setState({ attributeValue: this.props.instanceData.value });
								this.closePopUp() 
							} }
							style={ this.styleMatUI.closeButton }	
							variant="text"
							color="primary"
						>
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
			
			</TableCell>
		);
		else
			return(
				<TableCell>
				<Popup trigger={ <span > { this.state.attributeValue }  </span>  } position="bottom left">
					{close => (
						<div>
							<a href="#" className="close" onClick={close}> &times; </a>
							{ /*this.tempValue=this.state.name*/ }
							<b>Change Name</b> <br/>
							<input type="text" name="txtName" value={this.state.name} 
								onChange={ e => this.setState({ name: e.target.value }) }  /> <br/>

							<a onClick={close} >
								<button onClick={ () => { this.setState({ name:this.state.name }); } } className="btn btn-sm btn-link" >OK</button>
							</a>
							{<a onClick={close} >
								<button onClick={ () => this.setState({ name:this.props.name }) } className="btn btn-sm btn-link" >Cancel</button>
							</a>}
						</div>
					)}
				</Popup>
				</TableCell>
			)
		
	}

	//showPop2(){
		showpop2 =close => (
			<div>
				<a href="#" className="close" onClick={close}> &times; </a>
				{ /*this.tempValue=this.state.name*/ }
				<b>Change Name</b> <br/>
				<input type="text" name="txtName" value={this.state.name} 
					onChange={ e => this.setState({ name: e.target.value }) }  /> <br/>

				<a onClick={close} >
					<button onClick={ () => { this.setState({ name:this.state.name }); } } className="btn btn-sm btn-link" >OK</button>
				</a>
				{<a onClick={close} >
					<button onClick={ () => this.setState({ name:this.props.name }) } className="btn btn-sm btn-link" >Cancel</button>
				</a>}
			</div>
		)
	//}

	/**
	 * Update the store
	 * DB update should be called in the reducer
	 */
	dispatchUpdate = () => {
		rootStore.dispatch({
			type: 'UPDATE_CELL_VALUE',
			payload: {
				trackerInstanceId: this.state.trackerInstanceIdId,
				columnId: this.state.columnId,
				value: this.state.attributeValue
				// trackerInstanceIdId: 1,
				// columnId: 7,
				// value: 50
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
						return(
							<Popup trigger={ <span > { this.state.name }  </span>  } position="bottom left">
								{close => (
									<div>
										<a href="#" className="close" onClick={close}> &times; </a>
										{ /*this.tempValue=this.state.name*/ }
										<b>Change Name</b> <br/>
										<input type="text" name="txtName" value={this.state.name} 
											onChange={ e => this.setState({ name: e.target.value }) }  /> <br/>

										<a onClick={close} >
											<button onClick={ () => { this.setState({ name:this.state.name }); } } className="btn btn-sm btn-link" >OK</button>
										</a>
										{<a onClick={close} >
											<button onClick={ () => this.setState({ name:this.props.name }) } className="btn btn-sm btn-link" >Cancel</button>
										</a>}
									</div>
								)}
							</Popup>
						)

					case "radio1": //popup
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
								{ this.columnPredefinedValues[6].map( val => (
									<FormControlLabel
										key={ String(val.name) }
										value={ String(val.name) }
										control={<Radio color="primary" />}
										label={ val.value }
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

	openPopUp = () => {
		this.setState({ isOpen: true });
	};

	closePopUp = () => {
		this.setState({ isOpen: false });
	};

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

	componentDidMount(){
		console.log("trackerPopup didmount props:", this.props);
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

const mapStateToProps = (state, props) => {
	//console.log('trackerPopup.jsx-mapStateToProps', state);

	let trackerIndex = state.TrackInstaReducer.instanceData.findIndex( tracker => (
		tracker.id === props.trackerInstanceId
	) );

	/*let column = state.TrackInstaReducer.instanceData[trackerIndex].data.map( column => (
		column.columnId === props.columnId
	) );
	console.log("trackerPopup column:", column);*/

	if( trackerIndex > -1 ){
		return {
			metaData: state.MetaReducer.metaData,

			instanceData: state.TrackInstaReducer.instanceData[trackerIndex].data.find( column => (
				column.columnId === props.columnId
			) )

			//configData: state.TrackConfigReducer.configData,
		};
	}
	else
		console.log("trackerPopup indexError")
}

/** NOT connected with store since this component is called only by the TrackerTableData */
//export default PopDialog;
export default connect(mapStateToProps)(PopDialog);

//export default withStyles(styles)(PopDialog);
//export default withStyles()(PopDialog);


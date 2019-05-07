import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import Popup from "reactjs-popup";
//import Modal from 'react-modal';

//import Select from 'react-select'; //before material UI
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import { DatePicker } from '@y0c/react-datepicker';
//import { CalendarSelectedController } from '@y0c/react-datepicker';
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

import { petStore } from "../stores/pets";
import { MenuItem } from "@material-ui/core";

//import Checkbox from "./checkBoxComp";

//export default class PopDialog extends Component {
class PopDialog extends Component {
	state = {
		/** record id */         				identifier		:this.props.identifier,
		/** property value */     				attributeValue	:this.props.value,
		/** property name */      				attributeName	:this.props.property,
		/** element input type */ 				elementType		:this.props.elementType,
		/** Detect popup modal open state */	open			:false,
		/** temporary day to keep clendar selected date */ tempDayCal: this.props.value
	}

	styleTD={
		width: "100%" ,
		color: "#111111"
	}

	styleMatUI={
		closeButton: {
			cursor:'pointer', 
			float:'right', 
			marginTop: '5px', 
			width: '20px'
		}
	}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
	};
	

  render() {
		return (
			<React.Fragment>
				{ this.showPop(0) }
			</React.Fragment>
		)
	}
	
//}

	render0(){ // before material UI
		return (
			<React.Fragment>
				{ this.showPop(0) }
			</React.Fragment>
		)
	}

	captureOpen=()=>{
		this.setState({ open: true });
		//console.log("pop opened", this);
	}

	/*componentDidUpdate0(prevProps){
		//if(prevProps.value !== this.props.value){ alert(prevProps.value) }	
		console.log("componentDidUpdate prev: ", prevProps);
		if(this.state.attributeValue !== this.props.value){ console.log(prevProps.value) }	
	}*/

	showPop( attribute1 ){
		return(
			<div>
				<div style={this.styleTD} 
					onClick={ ()=>{ 
						this.handleClickOpen();
						console.log( "Popoup clicked: ",this ); 
					} } >

					{ this.props.value  /* this.props when using redux */}  
					{ /*this.state.attributeValue /* just for testing */ }  
					{ this.state.open ? 'Y' : '' }  
					{/* this.state.attributeValue } { this.state.open ? 'Y' : 'N' */}  
				</div>


				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					//PaperComponent={PaperComponent}
					aria-labelledby="draggable-dialog-title"
				>
					<DialogTitle id="draggable-dialog-title">
						<b>Change { this.state.attributeName }</b> <br/>
					</DialogTitle>

					<DialogContent>
						
							{ this.makeInputElements() }
						
					</DialogContent>

					<DialogActions>
											
						<Button onClick={ () => { 
							//this.setState({ attributeValue:this.state.attributeValue });
							petStore.dispatch({
								type: 'UPDATE_PET_DETAIL',
								payload: {
									identifier: this.state.identifier,
									attribute: this.state.attributeName,
									value: this.state.attributeValue
								}
							});
							this.handleClose(); 
							} } 
							variant="contained" color="primary"
							className="btn btn-sm btn-success" 
							style={this.styleMatUI.closeButton} >OK
						</Button>

						<Button onClick={ ()=>{
								this.setState({ attributeValue: this.props.value });
								this.handleClose() 
							} }
							style={ this.styleMatUI.closeButton }	
						>
								{ /* Close button svg icon from material UI documentation */ }
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
									viewBox="0 0 18 18">
									<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
									</svg>								
						</Button>
					</DialogActions>
				</Dialog>
			
			</div>
		);
		
	}

	makeInputElements= (  ) =>{
			switch (this.state.elementType) {
				case "text": case "number":
					return (

							<input type={this.state.elementType} 
								/*value={this.state.attributeValue}*/
								/*value={this.state.attributeValue}*/
								value={this.state.attributeValue}
								onChange={ e => (
									e.preventDefault(),
									//this.setState({ attributeValue: 10 }),
									this.setState({ attributeValue: e.target.value }),
									//this.props.sendToParent()
									console.log("onChange data", e)
								 ) } />

					);
					//break;

					case "select":
					return (
						<Select value={ this.state.attributeValue } 
							onChange={ e => this.setState({ attributeValue: e.target.value }) }
						>
							{
								this.props.data.valueSet.map( item =>
										<MenuItem key={ item.value } value={ item.value } >{ item.label }</MenuItem>
									)
							}
						</Select>
					);
					case "select0": //before material UI
					return (

						<Select 
								options={ this.props.data.valueSet }
				     		defaultValue={{ value: this.props.data.defaultValue , label: this.props.data.defValDisp }}
				     		onChange={ e => this.setState({ attributeValue: e.label }) }
				     		 />
					);
					//break;

				case "radio":
					return (
						<ul>
						{
							this.props.data.valueSet.map( val => (
								//console.log("def=",this.state.attributeValue,"val=",val),
								<li key={val}>
									<input type="radio" value={val}
										checked={ (this.state.attributeValue===val)? true : false }
										name={this.state.attributeName}
										onChange={ (e)=>{
											this.setState({ attributeValue: e.target.value});
											console.log(e)
											}
										}
									/> {val}
								</li>
								)
							)
						}
						</ul>
					);
					//break;

				case "checkBox":
					return (
						<div>
						{
							//symptomsInfo =[{ id:0, name:"Bleeding", value:"Bleeding" }]
							this.props.data.valueSet.map( (val, index) => (
								//console.log("def=",this.state.attributeValue,"val=",val),
								<div tmpkey={index} >
									<label tmpkey={val.id}>
										<input type="checkbox"
											key={val.id}
										 	name={val.name}
											value={val.name}
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
									                /*if (index > -1) {
									                    this.state.attributeValue.splice(index, 1);
									                    this.setState({
									                        attributeValue: this.state.attributeValue
									                    })
									                } */
									            }

												}}
										 />
										{val.value}
									</label>
								</div>

								)
							)
						}
						</div>
					);
					//break;

				case "date":
					return(
						<ul>
							<DayPicker showToday={false}
								onDayClick={ clickDay => { this.setState({ tempDayCal: clickDay }); this.changeAdmitDate(clickDay) } }
								selectedDays={ new Date(this.state.attributeValue) }
								
							/>

						</ul>
					)
				
				case "date1":
					return(
						<ul>
							<InfiniteCalendar
								width={280}
								height={200}
								selected={ new Date(this.state.attributeValue) }
								displayOptions={{
									showTodayHelper: false,
									showHeader: true
								}}
								locale={{
									weekStartsOn: 1
									}}
								onSelect={this.changeAdmitDate}
							/>
						</ul>
					)

				case "date0": // previously working one
					return (
						<ul>
							<DatePicker 
					     		selected={ new Date(this.state.attributeValue) } 
					     		onChange={this.changeAdmitDate} 
									dateFormat="YYYY-MM-dd" 
									onClick={ console.log("DP") 

									} 
					     	/>
					     	<br/>
						</ul>
					);
					//break;
				
				default:
					console.log("invalid case");
					break;
			}
	}

	changeAdmitDate=(admitDate)=>{
		//{ admitDate=admitDate.format('YYYY-MM-DD');} // Wed Apr 24 2019 00:00:00 GMT+0530 (India Standard Time)
		admitDate =  new Date( admitDate );
		admitDate = admitDate.getFullYear()+"-"+
			( admitDate.getMonth()<=8 ? "0"+(admitDate.getMonth()+1) : (admitDate.getMonth()+1) ) +"-"+
			( admitDate.getDate()<=9 ? "0"+admitDate.getDate() : admitDate.getDate() );

		console.log(admitDate);
		//this.setState({ admittedDate: admitDate.target.value })
		this.setState({ attributeValue: admitDate });
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
//export default withStyles()(PopDialog);


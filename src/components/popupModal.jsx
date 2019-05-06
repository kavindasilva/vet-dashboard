import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import Popup from "reactjs-popup";
//import Modal from 'react-modal';

import Select from 'react-select';
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

import { petStore } from "../stores/pets";

//import Checkbox from "./checkBoxComp";

export default class PopDialog extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
	}
	
//}

//export default class PopDialog extends Component {
  
  	/*constructor() {
  		super();
  		console.log(this);
    	//this.showPop0();
	}*/

	state = {
		/** record id */         				identifier		:this.props.identifier,
		/** property value */     				attributeValue	:this.props.value,
		/** property name */      				attributeName	:this.props.property,
		/** element input type */ 				elementType		:this.props.elementType,
		/** Detect popup modal open state */	popOpen			:false,
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

	render0(){
		return (
			<React.Fragment>
				{ this.showPop(0) }
			</React.Fragment>
		)
	}

	captureOpen=()=>{
		this.setState({ popOpen: true });
		//console.log("pop opened", this);
	}

	/*componentDidUpdate0(prevProps){
		//if(prevProps.value !== this.props.value){ alert(prevProps.value) }	
		console.log("componentDidUpdate prev: ", prevProps);
		if(this.state.attributeValue !== this.props.value){ console.log(prevProps.value) }	
	}*/

	showPop( attribute1 ){
		// to test direct input element in <td>
		if( this.state.elementType==="date1" ){
			return(
				<DatePicker 
					selected={ new Date(this.state.attributeValue) } 
					onChange={this.changeAdmitDate} 
					dateFormat="YYYY-MM-dd" 
					onClick={ console.log("DP") 

					} 
				/>
			)
		}
		else{
		return(
		  	<Popup 
				onOpen={ ()=> this.setState({ popOpen: true }) }
				onClose={ ()=>this.setState({ popOpen:false }) }
				//defaultOpen={false}
		  		trigger={
					<div style={this.styleTD} 
						onClick={ ()=>{ 
							console.log( "Popoup clicked: ",this ); 
						} } >
						{
							// to test direct input element in <td>
							(this.state.elementType!=="date1") ? this.props.value : <DatePicker 
					     		selected={ new Date(this.state.attributeValue) } 
					     		onChange={this.changeAdmitDate} 
									dateFormat="YYYY-MM-dd" 
									onClick={ console.log("DP") 

									} 
					     	/>
						} 
						{ this.state.popOpen ? 'Y' : '' }  
						{/* this.state.attributeValue } { this.state.popOpen ? 'Y' : 'N' */}  
					</div>
				} 
				//open={ this.captureOpen() }				
				position="bottom left" modal>
				{
					close => (
						<div className="container">
							{/*<button className="close btn btn-warning " onClick={ ()=>{
								this.setState({ attributeValue: this.props.value });
							close()} } > &times; </button>*/}

							<Button onClick={ ()=>{
								this.setState({ attributeValue: this.props.value });
								close()} }
								style={ this.styleMatUI.closeButton }	
							>
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
										viewBox="0 0 18 18">
										<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
										</svg>								
							</Button>

							{ /* <AppBar color="primary" position="static">
								<h1>My header</h1>
							</AppBar> */ }
							<b>Change { this.state.attributeName }</b> <br/>
							{ /* Starting of Column specific input attributes */ }
							

							{/* <input type="text" name="txtName" value={this.state.attributeName} 
									onChange={ e => this.setState({ attributeName: e.target.value }) }  /> <br/> */}
							{ this.makeInputElements() }


							{ /* End of Column specific input attributes */ }
							<div className="row">
								<div className="col=md-10 col-sm-10">
								</div>
								<div className="col-md-2 col-sm-2">
									<Button onClick={ () => { 
										//this.setState({ attributeValue:this.state.attributeValue });
										petStore.dispatch({
											type: 'UPDATE_PET_DETAIL',
											payload: {
												identifier: this.state.identifier,
												attribute: this.state.attributeName,
												value: this.state.attributeValue
											}
										})//.then( ()=> alert(this.props.value) )
										//this.props.sendToParent( this.state.attributeName , this.state.attributeValue );
										close(); 
										} } 
										variant="contained" color="primary"
										className="btn btn-sm btn-success" 
										style={this.styleMatUI.closeButton} >OK</Button>
										
									{/*<a onClick={close} >
									<button onClick={ () => this.setState({ attributeValue:this.props.attr }) } 
										className="btn btn-sm btn-warning" >Cancel</button>
										</a> 
										*/}
								</div>
							</div>
						</div>
					)
				}
			</Popup>
		);
		}
	}

	makeInputElements= (  ) =>{
			switch (this.state.elementType) {
				case "text": case "number":
					return (
						<div>
							<input type={this.state.elementType} 
								/*value={this.state.attributeValue}*/
								value={this.state.attributeValue}
								onChange={ (e) => (
									this.setState({ attributeValue: e.target.value })
									//this.props.sendToParent()
									//console.log("onChange data")
									) } />
						</div>
					);
					//break;

				case "select":
					return (
						<Select options={ this.props.data.valueSet }
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

//const uns=petStore.subscribe()

 
/*export default () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
);*/

/*const Modal =  () => (
  <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    closeOnDocumentClick
  >
    <span> Modal content </span>
  </Popup>
)*/

//render(<Modal />)
//render(<PopDialog />)

import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Popup from "reactjs-popup";
//import Modal from 'react-modal';

import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { petStore } from "../stores/pets";

//import Checkbox from "./checkBoxComp";

export default class PopDialog extends Component {
  
  	/*constructor() {
  		super();
  		console.log(this);
    	//this.showPop0();
	}*/

	state = {
		/** record key */         				identifier	:this.props.identifier,
		/** property value */     				attributeValue	:this.props.value,
		/** property name */      				attributeName	:this.props.property,
		/** element input type */ 				elementType		:this.props.elementType,
		/** Detect popup modal open state */	popOpen			:false,
	}

	styleTD={
		width: "100%" ,
		color: "#111111"
	}

	render(){
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

	showPop( attribute1 ){
		return(
		  	<Popup 
				onOpen={ ()=> this.setState({ popOpen: true }) }
				onClose={ ()=>this.setState({ popOpen:false }) }
				//defaultOpen={false}
		  		trigger={
					<div style={this.styleTD} 
						onClick={ ()=>{ console.log( "Popoup clicked: ",this ); 
						//this.captureOpen();
						/*window.popupOpen=1;*/  } } >
						{ this.props.value } { this.state.popOpen ? 'Y' : 'N' }  
					</div>
				} 
				//open={ this.captureOpen() }				
				position="bottom left" modal>
				{
					close => (
						<div>
							<a href="#" className="close" onClick={ ()=>{
								this.setState({ attributeValue: this.props.attr });
								close()} } > &times; </a>
							
							<b>Change { this.state.attributeName }</b> <br/>
							{ /* Starting of Column specific input attributes */ }
							

							{/* <input type="text" name="txtName" value={this.state.attributeName} 
									onChange={ e => this.setState({ attributeName: e.target.value }) }  /> <br/> */}
							{ this.makeInputElements() }


							{ /* End of Column specific input attributes */ }
							<button onClick={ () => { 
								this.setState({ attributeValue:this.state.attributeValue });
								petStore.dispatch({
									type: 'UPDATE_PET_DETAIL',
									payload: {
										identifier: this.state.identifier,
										attribute: this.state.attributeName,
										value: this.state.attributeValue
									}
								})
								//this.props.sendToParent( this.state.attributeName , this.state.attributeValue );
								close(); 
								} } 
								className="btn btn-sm btn-link" >OK</button>
								
							{/*<a onClick={close} >
							<button onClick={ () => this.setState({ attributeValue:this.props.attr }) } 
								className="btn btn-sm btn-warning" >Cancel</button>
								</a> 
								*/}
						</div>
					)
				}
			</Popup>
		);
	}

	makeInputElements= (  ) =>{
			switch (this.state.elementType) {
				case "text": case "number":
					return (
						<div>
							<input type={this.state.elementType} value={this.state.attributeValue}
								onChange={ (e) => (
									this.setState({ attributeValue: e.target.value })
									//this.props.sendToParent()
									//console.log("onChange data")
									) } />
						</div>
					);
					break;

				case "select":
					return (
						<Select options={ this.props.data.valueSet }
				     		defaultValue={{ value: this.props.data.defaultValue , label: this.props.data.defValDisp }}
				     		onChange={ e => this.setState({ attributeValue: e.label }) }
				     		 />
					);
					break;

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
										onChange={ (e)=>(
											this.setState({ attributeValue: e.target.value}),
											console.log(e)
											)
										}
									/> {val}
								</li>
								)
							)
						}
						</ul>
					);
					break;

				case "checkBox":
					return (
						<div>
						{
							//symptomsInfo =[{ id:0, name:"Bleeding", value:"Bleeding" }]
							this.props.data.valueSet.map( (val, index) => (
								//console.log("def=",this.state.attributeValue,"val=",val),
								<div>
									<label key={val.id}>
										<input type="checkbox"
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
									                    this.state.attributeValue.splice(index, 1);
									                    this.setState({
									                        attributeValue: this.state.attributeValue
									                    })
									                } 
									            }

												}
											}
										 />
										{val.value}
									</label>
								</div>

								)
							)
						}
						</div>
					);
					break;

				case "date":
					return (
						<ul>
							<DatePicker 
					     		selected={ new Date(this.state.attributeValue)} 
					     		onChange={this.changeAdmitDate} 
					     		dateFormat="YYYY-MM-dd" 
					     	/>
					     	<br/>
						</ul>
					);
					break;
				
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

	showPop0(){
		return(
			<Popup trigger={ <span > { this.state.name }  </span>  } position="bottom left">
			{
				close => (
						<div>
							<a href="#" className="close" onClick={close}> &times; </a>
							{ /*this.tempValue=this.state.name*/ }

							<b>Change Name</b> <br/>

							<input type="text" name="txtName" value={this.state.name} 
								onChange={ e => this.setState({ name: e.target.value }) }  /> <br/>

							<a onClick={close} >
								<button onClick={ () => { this.setState({ name:this.state.name }); } } className="btn btn-sm btn-link" >OK</button>
							</a>
							{/*<a onClick={close} >
							<button onClick={ () => this.setState({ name:this.props.name }) } className="btn btn-sm btn-link" >Cancel</button>
						</a>*/}
						</div>
					)
			}
			</Popup>
		);
	}
}

 
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

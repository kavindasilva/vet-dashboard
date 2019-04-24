import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Popup from "reactjs-popup";
 
/*export default () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
);*/

export default class PopDialog extends Component {
  
  	/*constructor() {
  		super();
  		console.log(this);
    	//this.showPop0();
	}*/

	state = {
		/** property value */     attributeValue:	this.props.attr  ,
		/** property name */      attributeName:	this.props.property,
		/** element input type */ elementType:		this.props.elementType,
		popOpen: false,
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
				//open={false}
		  		//open={ window.popupOpen===1 }
				//onOpen={ console.log( "Popoup opened: ",this ) }
				onOpen={ ()=> this.setState({ popOpen: true }) }
				onClose={ ()=>this.setState({ popOpen:false })}
				//defaultOpen={false}
		  		trigger={
					<div style={this.styleTD} 
						onClick={ ()=>{ console.log( "Popoup clicked: ",this ); 
						//this.captureOpen();
						/*window.popupOpen=1;*/  } } >
						{ this.state.attributeValue } { this.state.popOpen ? 'Y' : 'N' }  
					</div>
				} 
				//open={ this.captureOpen() }				
				position="bottom left">
			{
				close => (
					<div>
						<a href="#" className="close" onClick={close}> &times; </a>
						{ /*this.tempValue=this.state.attribute*/ }
						
						<b>Change { this.state.attributeName }</b> <br/>
						{ /* Starting of Column specific input attributes */ }
						
						{/* <input type="text" name="txtName" value={this.state.attributeName} 
								onChange={ e => this.setState({ attributeName: e.target.value }) }  /> <br/> */}
						
						<input type={this.state.elementType} value={this.state.attributeValue}
							onChange={ e => this.setState({ attributeValue: e.target.value }) } />

						{ /* End of Column specific input attributes */ }

						<button onClick={ () => { 
							this.setState({ attributeValue:this.state.attributeValue }); 
							close(); 
							} } 
							className="btn btn-sm btn-link" >OK</button>

							
						{/*<a onClick={close} >
						<button onClick={ () => this.setState({ attributeValue:this.props.attr }) } 
							className="btn btn-sm btn-warning" >Cancel</button>
							</a> */}
					</div>
				)
			}
			</Popup>
		);
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
							{<a onClick={close} >
							<button onClick={ () => this.setState({ name:this.props.name }) } className="btn btn-sm btn-link" >Cancel</button>
						</a>}
						</div>
					)
			}
			</Popup>
		);
	}
}

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

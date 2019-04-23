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
		attribute: this.props.attr
	}

	render(){
		return (
			<React.Fragment>
				{ this.showPop(0) }
			</React.Fragment>
		)
	}

	showPop( attribute1 ){
		return(
	  		<Popup trigger={ <span > { this.state.attribute }  </span>  } position="bottom left">
			{
				close => (
				    <div>
				     	<a href="#" className="close" onClick={close}> &times; </a>
				     	{ /*this.tempValue=this.state.attribute*/ }

				     	<b>Change Name</b> <br/>
				     	
				     	<input type="text" name="txtName" value={this.state.attribute} 
				     		onChange={ e => this.setState({ attribute: e.target.value }) }  /> <br/>

				     	<a onClick={close} >
				     		<button onClick={ () => { this.setState({ attribute:this.state.attribute }); } } className="btn btn-sm btn-link" >OK</button>
				     	</a>
				     	{<a onClick={close} >
							<button onClick={ () => this.setState({ attribute:this.props.attr }) } className="btn btn-sm btn-link" >Cancel</button>
						</a>}
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


/**
	Basics
*/

import React, { Component } from 'react';
//import ReactDOM from 'react-dom';


	//return <h2>Hello Counter</h2> ;
	/*
	return (
		<div>
			<h2>Counter</h2>
			<button>Increment</button>
		</div>
	);*/


class Counter extends Component {
	state = {
		title: "Dynamic title",
		img1Url: "http://127.0.0.1/dashboard/images/xampp-logo.svg",
		val: 0,
		val2: 2,
		val3: 3,

		tags: ["tag1", "tag2", "tag3"],
		tagObj: [ { id: 0, val:"tag1"}, { id: 1, val:"tag2"}, { id: 2, val:"tag3"} ],
	}

	styles1 = {
		fontSize:18,
		fontWeight: "bold"
	};

	/*
	constructor(){
		super();
		this.eventHandle2 = this.eventHandle2.bind(this);
	}
	*/

	render() {
		//return <h2>Hello Counter</h2> ;
		let varClass="btn btn-sm btn-";
		return (
			<React.Fragment>
				{/* -------------- Event Handling ------------------------- */}
				<h5>Event Handling</h5>		
				<button className={varClass+this.makeColor()} >val={this.state.val}</button>
				<button 
					className={varClass+"link"} 
					onClick={ ()=> { this.eventHandle3(); this.checkOddEven2(this.state.val) } }
					>{this.checkOddEven2(this.state.val)}
				</button>
				<span> onClick=&#123; ()=> &#123; this.eventHandle3(); this.checkOddEven2(this.state.val) &#125; &#125;</span>
				<hr/>

				<button className={varClass+this.makeColor()} >val={this.state.val}</button>
				<button 
					className={varClass+"link"} 
					onClick={this.eventHandle3}
					>onClick=&#123;this.eventHandle3&#125;
				</button>
				<span> onClick=&#123;this.eventHandle3&#125;</span>
				<hr/>

				<button 
					className={varClass+"link"} 
					onClick={this.eventHandle1}
					>onClick=&#123;this.eventHandle1&#125;
				</button>
				<span> onClick=&#123;this.eventHandle1&#125;</span>
				<hr/>

				{/* -------------- Loops ------------------------- */}
				<h5>Looping</h5>		
				<h6>tags: ["tag1", "tag2", "tag3"] -- display if not null</h6>
					{this.displayList1()}
				<hr/>

				<h6>tags: ["tag1", "tag2", "tag3"]</h6>
				<ul>
					{ this.state.tags.map( tag=> <li key={tag}> {tag} </li> ) }
				</ul>
				<hr/>

				<h6>tagObj: [ &#123; id: 0, val:"tag1"&#125;, &#123; id: 1, val:"tag2"&#125;, &#123; id: 2, val:"tag3"&#125; ]</h6>
				<ul>
					{ this.state.tagObj.map( tag=> <li key={tag.id}> {tag.val} </li> ) }
				</ul>
				<h6/>


				{/* -------------- Styles ------------------------- */}
				<h5>Styles</h5>

				<button style={ this.styles1 } >style= &#123;this.styles1 &#125;</button>
				<span> style= &#123;this.styles1 &#125;</span>
				<hr/>

				<button className={varClass+this.makeColor()} >className= &#123; {} &#125;</button>
				<span> className= &#123; varClass+this.makeColor() &#125;</span>
				<hr/>

				<button style={{ color: '#22ee22' }} >style= &#123;&#123; color: '#22ee22' &#125;&#125;</button>
				<span> style= &#123;&#123; color: '#22ee22' &#125;&#125;</span>
				<hr/>

				<button className="btn btn-primary btn-sm">className="btn btn-primary btn-sm"</button>
				<span> className="btn btn-primary btn-sm" </span>
				<hr/>


				{/* -------------- Attributes ------------------------- */}
				<h5>Attrubutes</h5>
				<img src={this.state.img1Url} alt="" />
				<p>  &#60; img src= &#123; this.state.img1Url &#125; alt="" />  </p>
				<hr/>

				<h5>{this.checkOddEven()}</h5>
				<p> &#123; this.checkOddEven() &#125; </p>
				<hr/>	

				<h5>{this.checkOddEven2(this.state.val2)}</h5>
				<p> &#123; this.checkOddEven2(this.state.val2) &#125; </p>
				<hr/>

				<h5>{this.checkOddEven2(this.state.val3)}</h5>
				<p> &#123; this.checkOddEven2(this.state.val3) &#125; </p>
				<hr/>

				<h5>{this.retVoid()}</h5>
				<p> &#123; this.retVoid() &#125; </p>
				<hr/>

				
			</React.Fragment>
		) ;

	}

	checkOddEven(){
		return (this.state.val%2===0)?"Even":"Odd";
	}

	checkOddEven2(value){
		return (value%2===0)?"Even":"Odd";
	}

	retVoid(){
		let tmp1=(this.state.val%2===0)?"Even":"Odd";
	}

	makeColor(){
		return (this.state.val===0) ? "warning":"primary";
	}

	displayList1(){
		if(this.state.tags.length===0)
			return <p>Empty Array</p>;
		else
			return <ul>{ this.state.tags.map( tag=> <li key={tag}> {tag} </li> ) }</ul> ;
	}

	eventHandle1=()=>{
		console.log("Event handle 1 called", this);
	}

	eventHandle2(){
		console.log("Event handle 2 called", this);
	}

	eventHandle3=()=>{
		this.setState( { val: this.state.val + 1 } );
	}
}

//export class Counter;
export default Counter;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css'; // working

//import { Counter } from "./components/counter";
//import Counter from "./components/counter";
import Pets from "./components/pets";


//var ele1=<h2>heading2</h2>;
//console.log(ele1);

/** 
	class Square extends React.Component {  // makes a class
	<Square />  // makes a new object
*/

class Square extends React.Component {
/* var val=this.value; */
	val = "test";
  render() {
    return (
    //<button className="square" onClick={function() { alert( {this.props.val}); }}>
		<button className="square" onClick={ ()=>alert("") } >
			{/* <button className="square" onClick={function() { alert("{'click ' + this.props.value}"); }}> */}
		{/* * {* TODO *} */}
		{this.props.value}
		</button>
	);
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i}/>;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

/*
    ReactDOM.render( elementObj , htmlElement );
*/

ReactDOM.render(  <Pets />,  document.getElementById('root') );
//ReactDOM.render(  <Game />,  document.getElementById('root') );

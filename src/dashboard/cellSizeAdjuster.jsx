//import {APP_MODE} from "../common/constants"

import React, { Component } from "react";
import '@y0c/react-datepicker/assets/styles/calendar.scss';

import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";


const useStyles = theme => ({
    root: {
      width: '100%',
    },
    paper: {
      marginTop: theme.spacing(3),
      width: '100%',
      overflowX: 'auto',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
});

class CellSizeAdjuster extends Component {
	state = {
        colWidth: 60,
        colHeight: 60,
	}

  	render() {
		return (
            <React.Fragment>
                <span style={{padding: "0px 10px 0px 10px"}} >
                    Cell Width: 
                    <input 
                        type="number" 
                        value={this.state.colWidth}
                        onChange={ (e)=>this.setState( {colWidth: e.target.value}, ()=>this.dispatchSizes() ) }
                    />
                </span>

                
                {/* Cell height
                <input 
                    type="number" 
                    value={this.state.colHeight}
                    onChange={ (e)=>this.setState( {colHeight: e.target.value}, ()=>this.dispatchSizes() ) }
                /> */}
            </React.Fragment>
        )
    }


    dispatchSizes = () => {
		rootStore.dispatch({
			type: 'UPDATE_CELL_SIZE',
			payload: {
				columnWidth: parseInt(this.state.colWidth),
				columnHeight: parseInt(this.state.colHeight),
			}
		});
	}
}

const mapStateToProps = (state, props) => {
	//console.log('CellSizeAdjuster.jsx-mapStateToProps', state);
    //console.log('CellSizeAdjuster.jsx-props1', props);
    
    return {};
}


export default connect(mapStateToProps)(withStyles(useStyles)(CellSizeAdjuster));



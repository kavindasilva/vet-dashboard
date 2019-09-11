//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";

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
import CustomDatePicker from "../dashboard/datePicker";

import TableCell from '@material-ui/core/TableCell';
import { MenuItem, RadioGroup, FormControlLabel, FormGroup, IconButton } from "@material-ui/core";

import { trackerPopupDefaultValues } from "../common/constants";
import ProgressBar from "../dashboard/onboardProgress"

class InstantPopup extends React.Component{

    /** 
     * defined by columnId
     * 
     * columnId: { predefined value set }
     * */
    columnPredefinedValues = trackerPopupDefaultValues;

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
    
    state ={
        ticket_id: this.props.ticket_id,
        columnName: this.props.columnName,
        isOpen: false,
        hs_source_field : this.props.hs_source_field,
        attributeValue: this.props.value,
    }

    render(){
        //console.log('instantPopup: Rendering cell content');

        return(
            <React.Fragment>
                <Popup 
                    trigger={ <div style={ {width: "100%", height:"100%" } }> {
                        String( (this.props.popValue)?(this.props.popValue):"-pop-" )
                        }  </div>  } 
                    position="bottom right"
                >
                { 
                    this.showPop()
                }
                </Popup>
                {
                    (this.state.columnName==="clinic_name") && 
                    <ProgressBar
                        ticket_id={ this.props.ticket_id }
                    />
                }
            </React.Fragment>
        );
    }

    showPop = () => (
		close => (
			<div>
				<a href="#" className="close" onClick={close}> &times; </a>
				<br/>
				{ this.makeInputElements() } <br/>
									
				<Button onClick={ (e) => { 
						e.preventDefault();
						//this.setState({ attributeValue:this.state.attributeValue });
						this.dispatchUpdate();
						close(); 
					} } 
					variant="text" color="primary"
					style={this.styleMatUI.closeButton} 
				>
					OK
				</Button>

			</div>
		)
	)

    dispatchUpdate = () => {
		rootStore.dispatch({
			type: 'UPDATE_CELL_VALUE',
			payload: {
				ticketId: this.state.ticket_id,
				property: this.state.columnName,
                value: this.state.attributeValue,
                data_source: this.state.hs_source_field + "_properties",
			}
		});
	}

    makeInputElements= () =>{
        switch (this.props.elementType) {
            case "text":
            case "number":
                return(
                    <TextField
                        label={ this.props.attributeName }
                        value={this.state.attributeValue}
                        onChange={ e => (
                            e.preventDefault(),
                            this.setState({ attributeValue: e.target.value }),
                            //(APP_MODE==="DEBUG")&&
                            console.log('New Value', e.target.value, this.state.attributeValue)
                            ) }

                        type={ this.props.elementType }
                        //type="number"
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

            case "radio": //popup
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
                        { this.columnPredefinedValues["completedStatus"].map( val => (
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
            
            default:
                console.log("invalid case. elemetType: ", this.props.elementType);
                break;
        }
    }
    
    componentDidMount(){
        //console.log("instant popup mount:", this.props);
    }
}


const mapStateToProps = (state, props) => {
    //console.log("instant popup", props);
    let source_field = props.hs_source_field + "_properties";

    return {
        popValue: state.ticketsDataReducer.ticketsData.find(
                tracker => (tracker.ticket_id === props.ticket_id)
            )[source_field][props.columnName]
    };
}

export default connect(mapStateToProps)(InstantPopup);



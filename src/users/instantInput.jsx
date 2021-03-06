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
import { MenuItem, RadioGroup, FormControlLabel, FormGroup } from "@material-ui/core";

import { trackerPopupDefaultValues } from "../common/constants";


class InstantPopup extends React.Component{

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
        // ticketId: this.props.ticketId,
        // columnId: this.props.columnId,
        // isOpen: false,
        // attributeName: this.props.rowData.attributeName,
        attributeValue: this.props.selectedValue,
        //attributeValue: null //this.props.popValue.value,
    }

    render(){
        console.log('instantPopup: Rendering cell content');

        return(
            <React.Fragment>
                <Popup 
                    trigger={ <span style={ {width: "100%" } }> T{
                        String( this.props.selectedValue )
                        }  </span>  } 
                    position="bottom right"
                >
                { 
                    this.showPop()
                }
                </Popup>
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
				ticketId: this.state.ticketId,
				columnId: this.state.columnId,
				value: this.state.attributeValue
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
                            this.setState({ attributeValue: e.target.value })
                            //console.log('New Value', e.target.value, this.state.attributeValue)
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
                        { this.props.predefinedData.map( val => (
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
                console.log("invalid case");
                break;
        }
    }
    
    componentDidMount(){
        console.log("instant popup mount:", this.props);
    }
}


const mapStateToProps = (state, props) => {
    return {
        //popData: props,
        popValue: state.ticketsDataReducer.ticketsData.find( tracker => (
            tracker.id === props.ticketId
        ) ).data.find( col => (
            col.columnId === props.columnId
        ) )
    };
}


export default InstantPopup;
//export default connect(mapStateToProps)(InstantPopup);



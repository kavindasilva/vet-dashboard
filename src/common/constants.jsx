

import React, { Component } from 'react';

import { connect } from "react-redux";
import { rootStore } from "../stores/pets"

import Button from '@material-ui/core/Button';

import Trackers from "../dashboard/trackers";
import Phoenix from "../phoenix/records";



export default function Records(){
    const sample1="sample text 1";
}


/**
 * tracker data columns related dataTypes
 * data type id: data type
 */
export const trackerColumnDataTypes={
    1: 'text',
    2: 'number',
    3: 'radio',
    4: 'date'
};

/**
 * tracker popup data related default values
 * columnId: default value
*/
export const trackerPopupDefaultValues={
    1: null,				// clinic name

    4: 0,					// RF sent date
    5: null,				// RF completed date
    6: [ { name:true, value:"OK" }, { name:false, value:"NotCompleted"} ],		// completed status
    7: 24					// total duration
};

/**
 * System user types
 * { id:<int: DB>, type:string, label:string }
 */
export const userTypes=[
    //{ id:3, type:"admin", label:"Admini" },
    { id:6, type:"partner", label:"Partner" },
    { id:6, type:"partnerUser", label:"User for Partner" },
    //{ id:102, type:"rest", label:"Restrict" },
];

/** */
// export function getValueOfColumn(columnId){
// //export function getValueOfColumn(rowColumnData, columnId){
//     let rowColumnData = this.props.rowColumnData;
//     let returnVal = rowColumnData.find( column => (
//         column.columnId === columnId
//     ) );
//     console.log("constants getValueOfColumnns retVal:", returnVal);

//     return returnVal;
//     //return null;
// }


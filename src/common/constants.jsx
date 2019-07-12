

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
 * these types are defined in the column configuration
 */
export const trackerColumnDataTypes={
    1: 'text',
    2: 'number',
    3: 'radio',
    4: 'date'
};

/**
 * tracker popup data related default values
 * columnName: default value
*
/*export const trackerPopupDefaultValues={
    1: null,				// clinic name

    4: 0,					// RF sent date
    5: null,				// RF completed date
    6: [ { name:true, value:"OK" }, { name:false, value:"NotCompleted"} ],		// completed status
    7: 24					// total duration
};*/
export const trackerPopupDefaultValues={
    "clinicName": { columnId:1, value:null },				// clinic name

    "RFSentDate": { columnId:4, value:null },					// RF sent date
    "RFCompletedDate": { columnId:5, value:null },				// RF completed date
    "completedStatus": [ { name:true, value:"OK" }, { name:false, value:"NotCompleted"} ],		// completed status
    "duration": { columnId:7, value:24 }					// total duration
};

/**
 * System user types for user management interface
 * { id:<int: DB>, type:string, label:string }
 */
export const userTypes=[
    //{ id:3, type:"admin", label:"Admini" },
    { id:6, type:"partner", label:"Partner with initial User" },
    { id:6, type:"partnerForUser", label:"User for existing Partner" },
    //{ id:102, type:"rest", label:"Restrict" },
];

/**
 * system user types indexed
 */
export const userTypeArray=[
    "USER_NONE", //0
    "USER_VISITOR",
    "USER_CLINIC",
    "USER_ADMIN", 
    "USER_VG", //4
    "USER_VENDOR",
    "USER_PARTNER",
    "USER_PROXY",
    "USER_KIOSK", //8
    "USER_ANY",
]

/**
 * table headers for hubspot data
 */
export const hubspotColumnData=[
	{ name:"clinicName", label:"Clinic name" },
	{ name:"ticketId", label:"Ticket ID" },
	{ name:"ticketName", label:"Ticket Name" },
	{ name:"ticketStatus", label:"Ticket Status" },
	{ name:"pipelineId", label:"Pipeline Id" },
	{ name:"pipelineStatusId", label:"Pipeline Status ID" },
]


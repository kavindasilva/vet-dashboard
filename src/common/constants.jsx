

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

/** */
//export 


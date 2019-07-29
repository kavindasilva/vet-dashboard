

import React, { Component } from 'react';

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore"


import App from "../components/app";
import Records from "../phoenix/records";
import Pets from "../components/pets";


import Button from '@material-ui/core/Button';

import Trackers from "../dashboard/trackers";
import Phoenix from "../phoenix/records";


export default class DrawerBody extends Component{
    
    render(){
        return this.returnElement( this.props.elementToRender );
        // return(
        //     <div></div>
        // )
    }

    returnElement(element){
        if(element === "allTrackers1" )
            return <Trackers />
        else if(element === "apiFailures1")
            return <Phoenix />
        else
            return(
                <div> element = { element } </div>
            );
    }
}


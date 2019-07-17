

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';

import { hubspotColumnData } from "../common/constants"

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

const hubspotcolumns=hubspotColumnData;

class TrackerHeader extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:2,
        TrackerHeader: null,
    }

	componentDidMount(){
		//console.log("TrackerHeader - mount. props:", this.props); //ok
		//console.log("TrackerHeader - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		return(
			this.showTableHeaders()
		)
    }


	showTableHeaders(){
		let returnArr=[ ];
				
		//console.log("trackerHeader trackerData:", this.props.trackerConfigData)
		//console.log("matched trackerID:", this.props.trackerConfigData.id)

		this.props.trackerConfigData.columns.forEach( column => { 

			/**
			 * current user's permitted columns & premission data
			 */
			let usersVisibleColumns=(column.permissions.find( (userPermission) => 
				userPermission.userId===this.props.metaData.userId,	
			))
			//console.log("trackerHeader userVisible", usersVisibleColumns)

			// if usersVisibleColumns not empty
			if( usersVisibleColumns!==undefined && usersVisibleColumns.read ){

				returnArr.push( 
					<Cell 
						key={ column.id }
						style={ { 
							width: "200px", 
							color:"#1122ee", 
							padding: "2px 10px 2px 12px",
							//backgroundColor: "#11cc22",
							backgroundColor: "transparent",
							borderColor: "#00ee00"
						} }
					>
						{ column.label }
					</Cell> 
				)

			}
			
		} );		

		return returnArr;
	}    

}

const mapStateToProps = (state, props) => {
	//console.log('TrackerHeader.jsx-mapStateToProps', state);
	console.log('state.ticketsDataReducer', state.ticketsDataReducer);
	return {
		metaData: state.MetaReducer.metaData,

		/** filter only the needed tracker tickets */
		ticketsData: state.ticketsDataReducer.ticketsData.filter( tickets => (
			tickets.tracker_id===props.trackerId
		) ),

		/** filter only the needed tracker's config */
		trackerConfigData: state.TrackConfigReducer.configData.find( trackerConfigs => (
			trackerConfigs.tracker_id===props.trackerId
		) ),

	};
}

export default connect(mapStateToProps)(TrackerHeader);


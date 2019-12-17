//import {APP_MODE} from "../common/constants"

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

import { globalStyles } from "../common/constants"

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

class TrackerHeader extends React.Component{
	state = { 
		...this.props.metaData,
		metaDataHash: null,
		
		colWidth: (this.props.metaData && this.props.metaData.ticketColumnWidth) ?this.props.metaData.ticketColumnWidth : 150,
		colHeight: (this.props.metaData && this.props.metaData.ticketColumnHeight) ?this.props.metaData.ticketColumnHeight : 60,

        tabValue:2,
        TrackerHeader: null,
	}
	
	componentWillReceiveProps(newProps){
		if(newProps.metaDataHash !== this.state.metaDataHash){
			this.setState({
				colWidth: (newProps.metaData && newProps.metaData.ticketColumnWidth) ?newProps.metaData.ticketColumnWidth : 150,
				colHeight: (newProps.metaData && newProps.metaData.ticketColumnHeight) ?newProps.metaData.ticketColumnHeight : 60,
			})
		}
	}

	componentDidMount(){
		//console.log("TrackerHeader - mount. props:", this.props); //ok
		//console.log("TrackerHeader - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		if(
			this.props.trackerConfigData 
			&& this.props.trackerConfigData.columns
			&& this.props.trackerConfigData.columns.length > 0
		){
			return(
				this.showTableHeaders()
			)
		}
		else{
			return( 
				<Cell 
					style={ { 
						color:"#1122ee", 
						padding: "2px 10px 2px 12px",
						backgroundColor: "#e3d3cc",
						...globalStyles["cell-borders"]
					}}
				>
					<small>No Table columns available in this Tracker</small>
					{/* this.props.trackerConfigData: <br/>
					{
						(this.props.trackerConfigData)
						? JSON.stringify(this.props.trackerConfigData)
						: "unDefined"
					} */}
					{
						console.log("trackerHeader configData ", this.props.trackerConfigData)
					}
				</Cell> 
			);
		}

    }


	showTableHeaders(){
		let returnArr=[ ];
		//console.log("trackerHeader trackerData:", this.props.trackerConfigData)
		//console.log("matched trackerID:", this.props.trackerConfigData.id)

		this.props.trackerConfigData.columns.forEach( (column, i) => { 

			/**
			 * current user's permitted columns & premission data
			 */
			let current_user_account_type = (this.props.metaData.userInfo)? this.props.metaData.userInfo.account_id : 0;
			let userRestrictedColumns=(column.permissions.find( (userPermission) => 
				parseInt(userPermission.user_account_id)===current_user_account_type,	
			))
			//console.log("trackerHeader userVisible", userRestrictedColumns)

			// if userRestrictedColumns not empty
			if( userRestrictedColumns===undefined || (userRestrictedColumns!==undefined && !userRestrictedColumns.is_read_restricted) ){

				returnArr.push( 
					<Cell 
						key={ i /* perviously column id */}
						style={ { 
							//width: "200px", 
							display: "table-cell",
							textAlign: "center",
							verticalAlign: "middle",

							// color:"#1122ee",
							// backgroundColor: "#e0e0d1", 
							...globalStyles["ticket-headers"],
							padding: "2px 10px 2px 12px",

							//minHeight: "70px", // not working
							// minWidth: "150px", // working
							// height: "auto", // working
							//width: "150px", // not working

							minWidth: this.state.colWidth,
							height: this.state.colHeight,

							//backgroundColor: "transparent",
							//border: "0.5pt solid #888888",

							...globalStyles["cell-borders"]
						}
						
						}
					>
						{ column.label }
					</Cell> 
				)

			}
			// else { // not restricted @HotPatch
			// 	returnArr.push( 
			// 		<Cell 
			// 			key={ i }
			// 			style={ { 
			// 				//display: "table-cell",
			// 				textAlign: "center",
			// 				verticalAlign: "middle",

			// 				color:"#1122ee", 
			// 				padding: "2px 10px 2px 12px",
			// 				backgroundColor: "#95a5a6",
							
			// 				minHeight: "70px", // not working
			// 				minWidth: "150px", // working
			// 				height: "50px", // working
			// 				width: "150px", // not working

			// 				...globalStyles["cell-borders"]
			// 			}}
			// 		>
			// 			{ column.label }
			// 		</Cell> 
			// 	)
			// }
			
		} );		

		return returnArr;
	}    

}

const mapStateToProps = (state, props) => {
	//console.log('TrackerHeader.jsx-mapStateToProps', state);
	console.log('state.ticketsDataReducer', state.ticketsDataReducer);
	return {
		metaData: state.MetaReducer.metaData,
		metaDataHash: JSON.stringify(state.MetaReducer.metaData),

		/** filter only the needed tracker tickets */
		ticketsData: state.ticketsDataReducer.ticketsData.filter( tickets => (
			tickets.tracker_id===props.tracker_id
		) ),

		/** filter only the needed tracker's config */
		trackerConfigData: state.TrackConfigReducer.configData.find( trackerConfigs => (
			trackerConfigs.tracker_id===props.tracker_id
		) ),

	};
}

export default connect(mapStateToProps)(TrackerHeader);


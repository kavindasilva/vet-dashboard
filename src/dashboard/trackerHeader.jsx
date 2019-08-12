import {APP_MODE} from "../common/constants"

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

        tabValue:2,
        TrackerHeader: null,
    }

	componentDidMount(){
		//if(APP_MODE==="DEBUG")console.log("TrackerHeader - mount. props:", this.props); //ok
		//if(APP_MODE==="DEBUG")console.log("TrackerHeader - mount. props.metaData:", this.props.metaData); 
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
					<small>No Table columns available in the config</small>
					this.props.trackerConfigData: <br/>
					{
						(this.props.trackerConfigData)
						? JSON.stringify(this.props.trackerConfigData)
						: "unDefined"
					}
				</Cell> 
			);
		}

    }


	showTableHeaders(){
		let returnArr=[ ];
		//if(APP_MODE==="DEBUG")console.log("trackerHeader trackerData:", this.props.trackerConfigData)
		//if(APP_MODE==="DEBUG")console.log("matched trackerID:", this.props.trackerConfigData.id)

		this.props.trackerConfigData.columns.forEach( (column, i) => { 

			/**
			 * current user's permitted columns & premission data
			 */
			let usersVisibleColumns=(column.permissions.find( (userPermission) => 
				userPermission.userId===this.props.metaData.userId,	
			))
			//if(APP_MODE==="DEBUG")console.log("trackerHeader userVisible", usersVisibleColumns)

			// if usersVisibleColumns not empty
			if( usersVisibleColumns!==undefined && usersVisibleColumns.read ){

				returnArr.push( 
					<Cell 
						key={ i /* perviously column id */}
						style={ { 
							//width: "200px", 
							color:"#1122ee", 
							padding: "2px 10px 2px 12px",
							backgroundColor: "#e3d3cc",
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
			// else{
			// 	returnArr.push( 
			// 		<Cell 
			// 			key={ i }
			// 			style={ { 
			// 				color:"#1122ee", 
			// 				padding: "2px 10px 2px 12px",
			// 				backgroundColor: "#e3d3cc",
			// 				...globalStyles["cell-borders"]
			// 			}}
			// 		>
			// 			No Headers are visible to you
			// 		</Cell> 
			// 	)
			// }
			
		} );		

		return returnArr;
	}    

}

const mapStateToProps = (state, props) => {
	//if(APP_MODE==="DEBUG")console.log('TrackerHeader.jsx-mapStateToProps', state);
	if(APP_MODE==="DEBUG")console.log('state.ticketsDataReducer', state.ticketsDataReducer);
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


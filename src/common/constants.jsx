
/**
 * app running mode: DEBUG , PRODUCTION
 * 
 * currently removed from the context
 */
//export const APP_MODE = "PRODUCTION";
//export const APP_MODE = "DEBUG";

export default function Records(){
    const sample1="sample text 1";
}

/**
 * tracker data columns related dataTypes
 * data type id: data type
 * these types are defined in the column configuration
 */
export const trackerColumnDataTypes = {
    'text'      : 'text',
    'number'    : 'number',
    // 'radio'     : 'radio',
    'date'      : 'date'
};

// export const trackerColumnDataTypes = {
//     1: 'text',
//     2: 'number',
//     3: 'radio',
//     4: 'date'
// };

export const globalStyles = {
    "cell-borders":{
        border: "1px solid #cdcdcd",
        padding: "2px 1px 0px 4px"
    },
    "ticket-headers":{
        color:"#1122ee",
        backgroundColor: "#e0e0d1"
    }
}

export const colouringRuleColors = {
    "green": { label:"Green", colorCode:"#5aed58"},
    "amber": { label:"Amber", colorCode:"#fcba03"},
    "red": { label:"Red", colorCode:"#fc1c1c"},
    "blue": { label:"Blue", colorCode:"#4a90ed"},
    "grey": { label:"Grey", colorCode:"#5e6875"},
}

export const ticketCellbgColors = {
    "green": { label:"Green", colorCode:"#5aed58"},
    "amber": { label:"Amber", colorCode:"#fcba03"},
    "red": { label:"Red", colorCode:"#fc1c1c"},
    "blue": { label:"Blue", colorCode:"#4a90ed"},
    "grey": { label:"Grey", colorCode:"#5e6875"},
    "error_white": { label:"Error White", colorCode: "#ffffcc"},
    "white": { label:"White", colorCode: "#ffffff"},

}

/**
 *  NEEDS REFACTORING DEFAULT VALUES
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
 * Pipeline stages of Existing Onboarding Pipeline
 * 
 * we had to add this like because hs sends stages not in the exact order
 */
export const pipelineSteps = [
    { id:"679568", label:"Hospital ready for onboarding"} ,
    { id:"679569", label:"Registration"} ,
    { id:"679573", label:"Account Customization"} ,
    { id:"679570", label:"Training/Testing"} ,
    { id:"679571", label:"Wdget live"} ,
    { id:"679572", label:"Lost"} ,
];

/**
 * system user types indexed
 */
export const userTypeArray=[
    "hc-USER_ADMIN", 
    "hc-STANDARD",
    "hc-CLASS_A",
    "hc-CLASS_B",
    "hc-CLASS_C",
    "hc-CLASS_D"
]

/** ticket searching options */
export const ticketSearchParams = [
    { param:"ticket_id", inputType:"text", label:"HS ticket number"},
    { param:"clinic_name", inputType:"text", label:"Clinic name"},
    { param:"create_date", inputType:"date", label:"Deal agreed date(s)"},
]

/** ticket cell sizes */
export const ticketCellSize = {
    // cellHeight: "60px",
    // cellWidth: "150px",
    cellHeight: "auto",
    cellWidth: "150px",
}

/** constant url's */
export const globalUrls = {
    hs_auth: "/hubspot/authorize",
    hs_verify: "/hubspot/verify",

}


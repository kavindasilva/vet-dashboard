
export default function Records(){
    const sample1="sample text 1";
}

/**
 * tracker data columns related dataTypes
 * data type id: data type
 * these types are defined in the column configuration
 */
export const trackerColumnDataTypes = {
    1: 'text',
    2: 'number',
    3: 'radio',
    4: 'date'
};

export const globalStyles = {
    "cell-borders":{
        border: "1px solid #cdcdcd",
    }
}

export const colouringRuleColors = {
    "green": { label:"Green", colorCode:"#5aed58"},
    "amber": { label:"Amber", colorCode:"#fcba03"},
    "red": { label:"Red", colorCode:"#fc1c1c"},
    "blue": { label:"Blue", colorCode:"#4a90ed"},
    "grey": { label:"Grey", colorCode:"#5e6875"},
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



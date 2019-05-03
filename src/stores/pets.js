import { createStore } from "redux";
import PetReducer from "../reducers/pets";

const initialState = { 
    admissions:[ 
        { id:'0' , name:"RoverStt" , speci:"Dog" , gender:"Male" , years:"3.5" , symptoms:["Fever", "Cold"] , admittedDate:"2019-04-01" },
        { id:'1' , name:"KingStt" , speci:"Cat" , gender:"Female" , years:"1.2" , symptoms:["Bleeding"] , admittedDate:"2019-04-02" },
        { id:'2' , name:"KittyStt" , speci:"Cat" , gender:"Male" , years:'3' , symptoms:["Swating" , "RefusingFood"] , admittedDate:"2019-04-02" },
        { id:'3' , name:"PeterStt" , speci:"Bird" , gender:"Male" , years:'1' , symptoms:["Sleeping"] , admittedDate:"2019-04-03" },
        { id:'4' , name:"TommyStt" , speci:"Dog" , gender:"Female" , years:'2' , symptoms:["Cold"] , admittedDate:"2019-04-03" }

    ]
 };
export const petStore = createStore(PetReducer, initialState);
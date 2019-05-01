
import React from 'react';
//import PetSingle from './pet2p';
//import ContPet2 from '../containers/contPets';

/*const Pet2 =( pets=0 ) => {
    return(
        <div>
            <ul>
                <Pet2 />
            </ul>
        </div>
        );
}*/

/*const Pet2 = ( pets ) => (
    <ul>
      {pets.map(pet =>
        <PetSingle
          key={pet.id}
          {...pet}
          
        />
      )}
    </ul>
  )*/

const Pet2 = ({ pets, toggleTodo=1 }) => {
  return (<ul>
    {
      /*pets.map(pet =>
        <PetSingle />
      )*/
      console.log("pet2 ul")
    }
  </ul>)
}


export default Pet2;


import React from 'react';

const PetSingle = ( petRecord ) => (
    <li
      key={petRecord.id}
    >
      {petRecord.text}
    </li>
  )

export default PetSingle;


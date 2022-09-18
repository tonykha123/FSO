import React from 'react';
import { ContentObj } from './Content';

const Part = ({ name, exerciseCount }: ContentObj) => {
  return (
    <div>
      <p>Excerise Name :{name}</p>
      <p>Excerise count :{exerciseCount}</p>
      <p>________________________________________</p>
    </div>
  );
};

export default Part;

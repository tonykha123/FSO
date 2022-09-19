import React from 'react';

import { PartsProps } from '../types';

const Part = ({ part }: PartsProps) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <p>
            <strong>
              {part.name} : {part.exerciseCount}
            </strong>
          </p>
          <em>{part.description}</em>
          <p>________________________________________</p>
        </div>
      );

    case 'submission':
      return (
        <div>
          <p>
            <strong>
              {part.name} : {part.exerciseCount}
            </strong>
          </p>
          <em>{part.description}</em>
          <p>Submit to {part.exerciseSubmissionLink}</p>

          <p>________________________________________</p>
        </div>
      );

    case 'groupProject':
      return (
        <div>
          <p>
            <strong>
              {part.name} : {part.exerciseCount}
            </strong>
            <p>Project Exercises : {part.groupProjectCount}</p>
          </p>
          <p>________________________________________</p>
        </div>
      );

    case 'special':
      return (
        <div>
          <p>
            <strong>
              {part.name} : {part.exerciseCount}
            </strong>
          </p>
          <div>
            <p>
              Required Skills :
              {part.requirements.map((r) => (
                <li key={r}> {r} </li>
              ))}
            </p>
          </div>

          <p>________________________________________</p>
        </div>
      );

    default:
      return null;
  }
};

export default Part;

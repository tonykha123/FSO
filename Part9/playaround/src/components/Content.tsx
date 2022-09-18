import React from 'react';
interface ContentProps {
  exerciseName: string;
  exerciseCount: number;
}

const Content = ({ exerciseName, exerciseCount }: ContentProps) => {
  return (
    <div>
      <p>Exercise name :{exerciseName}</p>
      <p>Exercise Count: {exerciseCount}</p>
      <p>________________________________________</p>
    </div>
  );
};

export default Content;

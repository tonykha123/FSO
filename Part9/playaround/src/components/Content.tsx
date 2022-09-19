import React from 'react';
import Part from './Part';
import { ContentProps } from '../types';

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      <div>
        {courseParts.map((part) => (
          <Part part={part} key={part.name} />
        ))}
      </div>
    </>
  );
};

export default Content;

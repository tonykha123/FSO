import React from 'react';
import Part from './Part';
export interface ContentObj {
  name: string;
  exerciseCount: number;
}
interface ContentProps {
  course: ContentObj[];
}

const Content = ({ course }: ContentProps) => {
  console.log(course);

  return (
    <>
      <div>
        {course.map((c) => (
          <Part name={c.name} exerciseCount={c.exerciseCount} key={c.name} />
        ))}
      </div>
    </>
  );
};

export default Content;

// {courseParts.map((part) => (
//   <Content
//     key={part.name}
//     name={part.name}
//     exerciseCount={part.exerciseCount}
//   />
// ))}

export interface HeaderProps {
  name: string;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
export interface CoursePartBaseWithDescription extends CoursePartBase {
  description?: string;
}
export interface ContentProps {
  courseParts: CoursePart[];
}

export interface CourseNormalPart extends CoursePartBaseWithDescription {
  type: 'normal';
  description: string;
}

export interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartBaseWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CoursePartBaseWithDescription {
  type: 'special';
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseSubmissionPart
  | CourseProjectPart
  | CourseSpecialPart;

export interface PartsProps {
  part: CoursePart;
}

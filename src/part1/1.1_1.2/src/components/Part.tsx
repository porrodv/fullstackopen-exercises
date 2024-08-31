import { CoursePart } from '../types/course.types';

interface PartProps extends CoursePart {}

export default function Part({ title, exercises }: PartProps) {
  return (
    <p>
      {title} {exercises}
    </p>
  );
}

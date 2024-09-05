import { CoursePart } from '../types/course.types';
import Part from './Part';

interface ContentProps {
  parts: Array<CoursePart>;
}

export default function Content({ parts }: ContentProps) {
  return (
    <>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </>
  );
}

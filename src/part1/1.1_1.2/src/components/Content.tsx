import { CoursePart } from '../types/course.types';
import Part from './Part';

interface ContentProps {
  parts: Array<CoursePart>;
}

export default function Content({ parts }: ContentProps) {
  return (
    <>
      {parts.map(({ title, exercises }, i) => (
        <Part key={i} title={title} exercises={exercises} />
      ))}
    </>
  );
}

import { Content, Header, Total } from '../components';
import type { Course } from '../types/course.types';

interface CourseProps {
  course: Course;
}

export default function Course({ course: COURSE }: CourseProps) {
  const total = COURSE.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <article className='course'>
      <Header course={COURSE.name} />
      <Content parts={COURSE.parts} />
      <Total total={total} />
    </article>
  );
}

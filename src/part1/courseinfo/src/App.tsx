import { Content, Header, Total } from './components';
import { COURSE_DETAILS } from './contants/course.constants';

export default function App() {
  const total = COURSE_DETAILS.parts.reduce(
    (sum, part) => sum + part.exercises,
    0,
  );

  return (
    <div>
      <Header course={COURSE_DETAILS.title} />
      <Content parts={COURSE_DETAILS.parts} />
      <Total total={total} />
    </div>
  );
}

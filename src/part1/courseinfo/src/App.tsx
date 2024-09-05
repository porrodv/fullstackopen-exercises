import { COURSES } from './contants/course.constants';
import { Course } from './components';

export default function App() {
  return (
    <main>
      <h1>Web development curriculum</h1>
      <div id='courses-container'>
        {COURSES.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}

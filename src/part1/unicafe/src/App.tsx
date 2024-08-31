import { useState } from 'react';
import { Comment, CommentList } from './types/comment.types';
import { Button, Statistics } from './components';

export default function App() {
  const [comments, setComments] = useState<CommentList>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = (type: Comment): void => {
    setComments((prevComments) => ({
      ...prevComments,
      [type]: prevComments[type] + 1,
    }));
  };

  return (
    <main>
      <section className='feedback'>
        <h1>Give feedback</h1>

        <div>
          <Button
            onClick={() => {
              handleClick('good');
            }}
            className='good'
          >
            Good
          </Button>
          <Button
            onClick={() => {
              handleClick('neutral');
            }}
            className='neutral'
          >
            Neutral
          </Button>
          <Button
            onClick={() => {
              handleClick('bad');
            }}
            className='bad'
          >
            Bad
          </Button>
        </div>
      </section>

      <Statistics comments={comments} />
    </main>
  );
}

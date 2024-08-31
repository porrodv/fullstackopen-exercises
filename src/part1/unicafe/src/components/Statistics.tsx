import { useMemo } from 'react';
import { CommentList } from '../types/comment.types';
import StatisticLine from './StatisticLine';

interface StatisticsProps {
  comments: CommentList;
}

export default function Statistics({ comments }: StatisticsProps) {
  const total = useMemo(
    () => comments.good + comments.neutral + comments.bad,
    [comments],
  );

  const average = useMemo(() => {
    const avg = total > 0 ? (comments.good * 1 + comments.bad * -1) / total : 0;
    return avg.toFixed(2);
  }, [comments, total]);

  const positivePer = useMemo(() => {
    const pos = total > 0 ? comments.good / total : 0;
    return `${(pos * 100).toFixed(2)}%`;
  }, [comments, total]);

  return (
    <section className="statistics">
      <h2>Statistics</h2>

      {comments.good + comments.neutral + comments.bad > 0 ? (
        <table>
          <tbody>
            <StatisticLine text="Good" value={comments.good} />
            <StatisticLine text="Neutral" value={comments.neutral} />
            <StatisticLine text="Bad" value={comments.bad} />
            <StatisticLine text="Total" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positivePer} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </section>
  );
}

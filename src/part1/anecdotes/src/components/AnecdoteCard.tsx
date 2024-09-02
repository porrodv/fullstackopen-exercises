interface AnecdoteCardProps {
  text: string;
  votes: number;
}

export default function AnecdoteCard({ text, votes }: AnecdoteCardProps) {
  return (
    <div className='anecdote-card'>
      <h4>{text}</h4>
      <p>Votes: {votes}</p>
    </div>
  );
}

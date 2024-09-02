import { useEffect, useState } from 'react';
import { Anecdote } from './types/anecdote.types';
import { AnecdoteCard, Button } from './components';
import { ANECDOTES } from './constants/anecdote.constants';
import { getRandomNumber } from './utils/math.utils';

export default function App() {
  const [anecdotes, setAnecdotes] = useState<Array<Anecdote>>(
    ANECDOTES.map((anecdote, i) => ({
      id: i,
      text: anecdote,
      votes: 0,
    })),
  );
  const [current, setCurrent] = useState<Anecdote>(getRandomAnecdote);
  const [topAnecdotes, setTopAnecdotes] = useState<Array<Anecdote>>(anecdotes);

  function getRandomAnecdote(): Anecdote {
    return anecdotes[getRandomNumber(anecdotes.length)];
  }

  const handleRandom = (): void => setCurrent(getRandomAnecdote);

  const updateAnecdote = (anecdote: Anecdote): void => {
    setAnecdotes((prevAnecdotes) =>
      prevAnecdotes.map((anec) => (anec.id === anecdote.id ? anecdote : anec)),
    );

    setCurrent(anecdote);
  };

  const updateTopAnecdotes = (anecdote: Anecdote): void => {
    setTopAnecdotes((prevTopAnecdotes) => {
      const maxVotes =
        prevTopAnecdotes.length > 0 ? prevTopAnecdotes[0].votes : 0;

      if (anecdote.votes > maxVotes) {
        return [anecdote];
      }

      if (anecdote.votes === maxVotes) {
        return [...prevTopAnecdotes, anecdote];
      }

      return prevTopAnecdotes;
    });
  };

  const handleVote = (): void => {
    const updatedCurrentAnecdote: Anecdote = {
      ...current,
      votes: current.votes + 1,
    };

    updateAnecdote(updatedCurrentAnecdote);
    updateTopAnecdotes(updatedCurrentAnecdote);
  };

  return (
    <main>
      <section className='anecdote-day'>
        <h1>Anecdote of the day</h1>
        <AnecdoteCard text={current.text} votes={current.votes} />

        <div className='anecdote-day__actions'>
          <Button onClick={handleRandom} className='next'>
            Next anecdote
          </Button>
          <Button onClick={handleVote} className='vote'>
            Vote
          </Button>
        </div>
      </section>

      {topAnecdotes.length > 0 && topAnecdotes[0].votes > 0 && (
        <section className='top-anecdotes'>
          <h2>Anecdotes with most votes ({topAnecdotes.length})</h2>
          <div className='top-anecddotes__container'>
            {topAnecdotes.map(({ id, text, votes }) => (
              <AnecdoteCard key={id} text={text} votes={votes} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

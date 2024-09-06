import type { Person as PersonType } from '../types/person.types';
import Person from './Person';

interface PersonListProps {
  persons: Array<PersonType>;
}

export default function PersonList({ persons }: PersonListProps) {
  if (persons.length === 0) {
    return <p className='no-results'>No results</p>;
  }

  return (
    <ul>
      {persons.map(({ id, name, number }) => (
        <Person key={id} name={name} number={number} />
      ))}
    </ul>
  );
}

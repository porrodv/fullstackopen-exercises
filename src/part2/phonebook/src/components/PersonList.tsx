import type { Person as PersonType } from '../types/person.types';
import PersonItem from './PersonItem';

interface PersonListProps {
  persons: Array<PersonType>;
  deletePerson: (id: number) => void;
}

export default function PersonList({ persons, deletePerson }: PersonListProps) {
  if (persons.length === 0) {
    return <p className='no-results'>No results</p>;
  }

  return (
    <ul>
      {persons.map((person) => (
        <PersonItem
          key={person.id}
          person={person}
          deletePerson={deletePerson}
        />
      ))}
    </ul>
  );
}

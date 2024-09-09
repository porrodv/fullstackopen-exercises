import type { Person } from '../types/person.types';

interface PersonItemProps {
  person: Person;
  deletePerson: (id: number) => void;
}

export default function PersonItem({ person, deletePerson }: PersonItemProps) {
  const handleClick = () => {
    deletePerson(person.id);
  };

  return (
    <li>
      <div className='person-item__container'>
        <p>
          {person.name} {person.number}
        </p>
        <div>
          <button className='delete-btn' onClick={handleClick}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

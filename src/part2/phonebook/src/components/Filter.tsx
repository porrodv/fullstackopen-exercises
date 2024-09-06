import { Person } from '../types/person.types';

interface FilterProps {
  persons: Array<Person>;
  onFilter: (filtered: Array<Person>) => void;
}

export default function Filter({ persons, onFilter }: FilterProps) {
  const applyFilters = (searchTerm: string): void => {
    const filteredPersons = persons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    onFilter(filteredPersons);
  };

  return (
    <div>
      <label htmlFor='filter'>Filter </label>
      <input
        type='text'
        name='filter'
        onChange={(e) => {
          applyFilters(e.target.value);
        }}
      />
    </div>
  );
}

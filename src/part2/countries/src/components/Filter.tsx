import { Country } from '../types/country.types';

interface FilterProps {
  countries: Array<Country>;
  onFilter: (filtered: Array<Country>) => void;
}

export default function Filter({ countries, onFilter }: FilterProps) {
  const applyFilters = (searchTerm: string): void => {
    if (searchTerm === '') {
      onFilter([]);
      return;
    }

    const filteredPersons = countries.filter((c) =>
      c.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    onFilter(filteredPersons);
  };

  return (
    <div>
      <label htmlFor='filter'>Find countries </label>
      <input
        type='text'
        name='find'
        onChange={(e) => {
          applyFilters(e.target.value);
        }}
      />
      <p></p>
    </div>
  );
}

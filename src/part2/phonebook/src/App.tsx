import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { PERSONS } from './constants/person.constants';
import { Person } from './types/person.types';
import { Filter, PersonForm, PersonList } from './components';

export default function App() {
  const [persons, setPersons] = useState<Array<Person>>(PERSONS);
  const [filteredPersons, setFilteredPersons] =
    useState<Array<Person>>(persons);

  const updatePersons = (newPerson: Person) => {
    setPersons((prevPersons) => prevPersons.concat(newPerson));
  };

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);

  return (
    <main>
      <h1>Phonebook</h1>
      <Filter persons={persons} onFilter={setFilteredPersons} />

      <h2 id='new-person__title'>Add a new person</h2>
      <PersonForm persons={persons} updatePerson={updatePersons} />

      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} />
    </main>
  );
}

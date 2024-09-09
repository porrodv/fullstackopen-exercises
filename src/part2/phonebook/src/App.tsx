import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Person } from './types/person.types';
import { Filter, PersonForm, PersonList } from './components';

const BASE_PATH = 'http://localhost:3005/persons';

export default function App() {
  const [persons, setPersons] = useState<Array<Person>>();
  const [filteredPersons, setFilteredPersons] = useState<Array<Person>>();

  const updatePersons = (newPerson: Person) => {
    setPersons((prevPersons) => prevPersons?.concat(newPerson));
  };

  const fetchData = useCallback(async () => {
    const response = await axios.get(BASE_PATH);
    const data: Array<Person> = response.data;

    setPersons(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);

  if (!persons || !filteredPersons) {
    return <h1 id='error'>No data.</h1>;
  }

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

import { useCallback, useEffect, useState } from 'react';
import { NewPerson, Person } from './types/person.types';
import { Filter, PersonForm, PersonList } from './components';
import {
  createPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from './services/person.services';

export default function App() {
  const [persons, setPersons] = useState<Array<Person>>();
  const [filteredPersons, setFilteredPersons] = useState<Array<Person>>();

  const handleCreate = async (newPerson: NewPerson) => {
    try {
      const createdPerson = await createPerson(newPerson);
      setPersons((prevPersons) => prevPersons?.concat(createdPerson));
    } catch (error) {
      console.error(error);
      alert('error creating person');
    }
  };

  const handleUpdate = async (id: number, newPerson: NewPerson) => {
    try {
      const updatedPerson = await updatePerson(id, {
        name: newPerson.name,
        number: newPerson.number,
      });
      setPersons((prevPersons) =>
        prevPersons?.map((person) =>
          person.id === id ? updatedPerson : person,
        ),
      );
    } catch (error) {
      console.error(error);
      alert(`error updating person's number`);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const deletedPerson = await deletePerson(id);
      setPersons((prevPersons) =>
        prevPersons?.filter((person) => person.id !== deletedPerson.id),
      );
    } catch (error) {
      console.error(error);
      alert('error deleting person');
    }
  };

  const fetchData = useCallback(async () => {
    const persons = await getAllPersons();
    setPersons(persons);
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
      <article>
        <h1>Phonebook</h1>
        <Filter persons={persons} onFilter={setFilteredPersons} />

        <h2 id='new-person__title'>Add a new person</h2>
        <PersonForm
          persons={persons}
          createPerson={handleCreate}
          updatePerson={handleUpdate}
        />
      </article>

      <aside>
        <h2 className='person-list__title'>Numbers</h2>
        <PersonList persons={filteredPersons} deletePerson={handleDelete} />
      </aside>
    </main>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { NewPerson, Person } from './types/person.types';
import { NotificationType } from './types/notification.types';
import { Filter, PersonForm, PersonList, Notification } from './components';
import {
  createPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from './services/person.services';
import { AxiosError, AxiosResponse } from 'axios';

export default function App() {
  const [persons, setPersons] = useState<Array<Person>>();
  const [filteredPersons, setFilteredPersons] = useState<Array<Person>>();
  const [status, setStatus] = useState<{
    type: NotificationType;
    message: string;
  } | null>(null);

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

  const handleCreate = async (newPerson: NewPerson) => {
    try {
      const createdPerson = await createPerson(newPerson);
      setPersons((prevPersons) => prevPersons?.concat(createdPerson));
      showNotification('success', `${createdPerson.name} created correctly`);
    } catch (error) {
      console.error(error);
      showNotification('error', 'Error adding person');
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
      showNotification(
        'success',
        `${newPerson.name}'s number updated correctly`,
      );
    } catch (error) {
      console.error(error);
      showNotification('error', 'Error updating person');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const deletedPerson = await deletePerson(id);
      setPersons((prevPersons) =>
        prevPersons?.filter((person) => person.id !== deletedPerson.id),
      );
      showNotification('warning', `${deletedPerson.name} deleted correctly`);
    } catch (error: any) {
      console.error(error);

      if (error.status === 404) {
        showNotification(
          'error',
          'Person has already been removed from server',
        );
      }
      showNotification('error', 'Error deleting person');
    }
  };

  function showNotification(type: NotificationType, message: string) {
    setStatus({ type, message });

    setTimeout(() => {
      setStatus(null);
    }, 5000);
  }

  if (!persons || !filteredPersons) {
    return <h1 id='error'>No data.</h1>;
  }

  return (
    <main>
      {status && <Notification type={status.type} message={status.message} />}

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

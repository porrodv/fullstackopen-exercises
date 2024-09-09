import { FormEvent, useState } from 'react';
import { NewPerson, Person } from '../types/person.types';

interface PersonFormProps {
  persons: Array<Person>;
  createPerson: (newPerson: NewPerson) => void;
  updatePerson: (id: number, newPerson: NewPerson) => void;
}

export default function PersonForm({
  persons,
  createPerson,
  updatePerson,
}: PersonFormProps) {
  const [newName, setNewName] = useState<string>('');
  const [newNumber, setNewNumber] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (newName === '') return alert('name field cannot be empty');

    const existingPerson = verifyPersonExists(newName);

    if (existingPerson) {
      if (newNumber === '') return alert('number field cannot be empty');

      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;

      if (!window.confirm(message)) return;

      updatePerson(existingPerson.id, {
        name: existingPerson.name,
        number: newNumber,
      });
      clearInputs();
      return;
    }

    const newPerson: NewPerson = {
      name: newName,
      number: newNumber,
    };

    createPerson(newPerson);
    clearInputs();
  };

  function verifyPersonExists(name: string): Person | undefined {
    return persons.find((e) => e.name === name);
  }

  function clearInputs(): void {
    setNewName('');
    setNewNumber('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name </label>
        <input
          type='text'
          name='name'
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor='number'>Number </label>
        <input
          type='text'
          name='number'
          value={newNumber}
          onChange={(e) => {
            setNewNumber(e.target.value);
          }}
        />
      </div>
      <div>
        <button className='add-btn' type='submit'>
          Add
        </button>
      </div>
    </form>
  );
}

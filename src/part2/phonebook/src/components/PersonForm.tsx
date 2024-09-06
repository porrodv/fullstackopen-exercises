import { FormEvent, useState } from 'react';
import { Person } from '../types/person.types';

interface PersonFormProps {
  persons: Array<Person>;
  updatePerson: (newPerson: Person) => void;
}

export default function PersonForm({ persons, updatePerson }: PersonFormProps) {
  const [newName, setNewName] = useState<string>('');
  const [newNumber, setNewNumber] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (verifyPersonExists(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    updatePerson(newPerson);
    clearInputs();
  };

  function verifyPersonExists(name: string): boolean {
    return persons.some((e) => e.name === name);
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
        <button type='submit'>Add</button>
      </div>
    </form>
  );
}

import type { Person } from '../types/person.types';

interface PersonProps extends Omit<Person, 'id'> {}

export default function Person({ name, number }: PersonProps) {
  return (
    <li>
      {name} {number}
    </li>
  );
}

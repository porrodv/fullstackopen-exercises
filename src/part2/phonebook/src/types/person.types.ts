interface Person {
  id: number;
  name: string;
  number: string;
}

type NewPerson = Omit<Person, 'id'>;

export type { NewPerson, Person };

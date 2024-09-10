type Person = {
  id: number;
  name: string;
  number: string;
};

type NewPerson = Omit<Person, 'id'>;

export type { Person, NewPerson };

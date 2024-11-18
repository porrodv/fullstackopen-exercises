import axios from 'axios';
import { Person, NewPerson } from '../types/person.types';

// Local json-server
// const BASE_PATH = 'http://localhost:3005/persons';

// Express.js API
const BASE_PATH = 'http://localhost:3001/api/persons';

export const getAllPersons = async (): Promise<Array<Person>> => {
  const response = await axios.get(BASE_PATH);
  return response.data;
};

export const createPerson = async (newPerson: NewPerson): Promise<Person> => {
  const response = await axios.post(BASE_PATH, newPerson);
  return response.data;
};

export const updatePerson = async (
  id: number,
  newPerson: NewPerson,
): Promise<Person> => {
  const response = await axios.put(`${BASE_PATH}/${id}`, newPerson);
  return response.data;
};

export const deletePerson = async (id: number) => {
  const response = await axios.delete(`${BASE_PATH}/${id}`);
  return response.data;
};

import { Request, Response } from 'express';
import { Person } from './types/person.types';
import { ErrorResponse } from './types/api.types';

require('dotenv').config();
const express = require('express');
const logger = require('./middlewares/logger.middleware');
const cors = require('./middlewares/cors.middleware');
const app = express();

app.use(express.json());
app.use(logger);
app.use(cors);

let persons: Person[] = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request: Request, response: Response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request: Request, response: Response) => {
  const id = parseInt(request.params.id);

  if (!isPersonExists(id))
    return response.status(404).json({
      statusCode: 404,
      message: 'Person not found',
    } as ErrorResponse);

  const person = persons.find((p) => p.id === id);

  response.json(person);
});

app.post('/api/persons', (request: Request, response: Response) => {
  const body = request.body;
  const name = body.name;
  const number = body.number;

  if (!name || name === '') {
    return response.status(400).json({
      statusCode: 400,
      message: 'Name is necessary and cannot be empty',
    } as ErrorResponse);
  }

  if (isPersonNameExists(name)) {
    return response.status(400).json({
      statusCode: 400,
      message: 'Name must be unique',
    } as ErrorResponse);
  }

  if (!number || number === '') {
    return response.status(400).json({
      statusCode: 400,
      message: 'Name is necessary and cannot be empty',
    } as ErrorResponse);
  }

  const person = {
    id: generateId(),
    name,
    number,
  };

  persons = persons.concat(person);

  response.status(201).json(person);
});

app.delete('/api/persons/:id', (request: Request, response: Response) => {
  const id = parseInt(request.params.id);

  if (!isPersonExists(id)) {
    return response.status(404).json({
      statusCode: 404,
      message: 'Person not found',
    } as ErrorResponse);
  }

  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

app.get('/info', (request: Request, response: Response) => {
  const numberOfPeople = persons.length;
  const date = new Date();

  const htmlResponse = `
    <div>
      <h2>Phonebook has info for ${numberOfPeople} people</h2>
      <p>${date}</p>
    </div>
  `;

  response.send(htmlResponse);
});

function generateId() {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
}

function isPersonExists(id: number) {
  return persons.some((p) => p.id === id);
}

function isPersonNameExists(name: string) {
  return persons.some((p) => p.name === name);
}

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

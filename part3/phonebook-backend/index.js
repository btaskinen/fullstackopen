const express = require("express");
const app = express();

app.use(express.json());

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const numberOfPhonebookEntries = persons.length;
  const timeOfRequest = new Date();
  response.send(
    `
    <p>The phonebook has information for ${numberOfPhonebookEntries} people.<p>
    <p>${timeOfRequest}<p>
    `
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send(`Person with ID ${id} does not exist`).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  person = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = 3002;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);

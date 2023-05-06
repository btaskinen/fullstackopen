const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

morgan.token("request-body", (request, response) => {
  if (request.body.name) return JSON.stringify(request.body);
});

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :response-time :request-body "));

let persons = [
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

const generateId = () => {
  const id = Math.floor(Math.random() * 1000);
  return id;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "Name is missing" });
  }

  if (!body.number) {
    return response.status(400).json({ error: "Number is missing" });
  }

  const existingName = persons.find((p) => p.name === body.name);

  if (existingName) {
    return response
      .status(400)
      .json({ error: "Name is already in Phonebook. Name must be unique." });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

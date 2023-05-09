require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const PhonebookEntry = require("./models/phonebook");

morgan.token("request-body", (request, response) => {
  if (request.body.name) return JSON.stringify(request.body);
});

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :response-time :request-body "));

app.get("/api/persons", (request, response) => {
  PhonebookEntry.find({}).then((entries) => {
    response.json(entries);
  });
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
  PhonebookEntry.findById(request.params.id).then((entry) => {
    if (entry) {
      response.json(entry);
    } else {
      response
        .status(404)
        .send(`Person with ID ${request.params.id} does not exist`)
        .end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  person = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "Name is missing" });
  }

  if (!body.number) {
    return response.status(400).json({ error: "Number is missing" });
  }

  // const existingName = persons.find((p) => p.name === body.name);

  // if (existingName) {
  //   return response
  //     .status(400)
  //     .json({ error: "Name is already in Phonebook. Name must be unique." });
  // }

  const entry = new PhonebookEntry({
    name: body.name,
    number: body.number,
  });

  entry.save().then((savedEntry) => {
    response.json(savedEntry);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

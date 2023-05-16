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

app.delete("/api/persons/:id", (request, response, next) => {
  PhonebookEntry.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const entry = {
    name: body.name,
    number: body.number,
  };

  PhonebookEntry.findByIdAndUpdate(request.params.id, entry, { new: true })
    .then((updatedEntry) => {
      response.json(updatedEntry);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

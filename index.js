const express = require("express");

const app = express();

var persons = [
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
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

const PORT = 3001;

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const wantedPersonId = Number(req.params.id);
  const foundPerson = persons.find((person) => person.id === wantedPersonId);
  if (foundPerson) {
    return res.json(foundPerson);
  } else {
    return res.sendStatus(404);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const wantedPersonId = Number(req.params.id);
  const foundPerson = persons.find((person) => person.id === wantedPersonId);
  if (foundPerson) {
    persons = persons.filter((person) => person.id !== foundPerson.id);
    return res.sendStatus(204);
  } else {
    return res.sendStatus(404);
  }
});

app.get("/info", (req, res) => {
  const entries = persons.length;
  const datestamp = new Date();
  res.send(
    `<p>Phonebook has info for ${entries} people</p><p>${datestamp}</p>`
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const express = require("express");
const morgan = require("morgan");

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

app.use(morgan("tiny"));
app.use(express.json());

const PORT = 3001;

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res
      .status(400)
      .json({ error: "request is missing required fields" });
  }
  if (persons.find((person) => person.name === req.body.name)) {
    return res.status(400).json({ error: "name already exists" });
  }
  id = Math.floor(Math.random() * 100000);
  const newPerson = { id, name: req.body.name, number: req.body.number };
  persons.push(newPerson);
  res.status(201).json(newPerson);
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

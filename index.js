const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

var persons = [
  {
    id: 1,
    name: "Arto Hellas",
    phoneNumber: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    phoneNumber: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    phoneNumber: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    phoneNumber: "39-23-6423122",
  },
];

app.use(cors());
morgan.token("reqBody", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqBody"
  )
);
app.use(express.json());

const PORT = 3001;

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  if (!req.body.name || !req.body.phoneNumber) {
    return res
      .status(400)
      .json({ error: "request is missing required fields" });
  }
  if (persons.find((person) => person.name === req.body.name)) {
    return res.status(400).json({ error: "name already exists" });
  }
  id = Math.floor(Math.random() * 100000);
  const newPerson = {
    id,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
  };
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

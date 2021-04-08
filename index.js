const express = require("express");

const app = express();

const notes = [
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
  res.json(notes);
});

app.get("/info", (req, res) => {
  const entries = notes.length;
  const datestamp = new Date();
  res.send(
    `<p>Phonebook has info for ${entries} people</p><p>${datestamp}</p>`
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

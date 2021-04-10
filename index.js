require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const Person = require('./models/person');

app.use(cors());
app.use(express.static('build'));
morgan.token('reqBody', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqBody'
  )
);
app.use(express.json());

const PORT = process.env.PORT;

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((documents) => {
      res.json(documents);
    })
    .catch((reason) => {
      res.status(500).json({ error: reason });
    });
});

app.post('/api/persons', (req, res) => {
  if (!req.body.name || !req.body.phoneNumber) {
    return res
      .status(400)
      .json({ error: 'request is missing required fields' });
  }
  Person.find({ name: req.body.name }).then((document) => {
    if (Object.keys(document).length > 0) {
      return res.status(400).json({ error: 'name already exists' });
    }
  });
  const newPerson = new Person({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
  });
  newPerson
    .save()
    .then((document) => {
      res.status(201).json(document);
    })
    .catch((reason) => {
      res.status(500).json({ error: reason });
    });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((document) => {
      if (document) {
        return res.json(document);
      } else {
        return res.sendStatus(404);
      }
    })
    .catch((reason) => {
      res.status(500).json({ error: reason });
    });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((document) => {
      if (document) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((reason) => {
      res.status(500).json({ error: reason });
    });
});

app.get('/info', (req, res) => {
  const datestamp = new Date();
  Person.countDocuments({}).then((err, count) => {
    if (err) {
      res.send('<p>Error retrieving phonebook data.</p>');
    } else {
      res.send(`<p>Phonebook has info for ${count} people</p><p>${datestamp}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

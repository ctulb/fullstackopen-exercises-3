require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const globalErrorHandler = require('./middleware/errorHandler');

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

const createBadRequestError = (message) => {
  const error = new Error(message);
  error.name = 'BadRequestError';
  return error;
};

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  if (!req.body.name || !req.body.phoneNumber) {
    next(createBadRequestError('request missing required fields'));
  } else {
    Person.findOne({ name: req.body.name }).then((person) => {
      if (person) {
        next(createBadRequestError('name already exists'));
      } else {
        const newPerson = new Person({
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
        });
        newPerson
          .save()
          .then((person) => {
            res.status(201).json(person);
          })
          .catch((error) => next(error));
      }
    });
  }
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        return res.json(person);
      } else {
        return res.sendStatus(404);
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((person) => {
      if (person) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error) => next(error));
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

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

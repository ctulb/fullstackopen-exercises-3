const mongoose = require("mongoose");
require("dotenv").config();

// rather than pass the password as a command line argument, I am using an environment variable from .env instead
if (!process.env.MONGODB_CONNECTION_STRING) {
  console.error("MongoDB connection string not set");
  process.exit(1);
}

if (process.argv.length !== 2 && process.argv.length !== 4) {
  console.error(
    "Please either:\n- provide no arguments to display all phonebook entries\n- provide the name and number to add as arguments: node mongo.js <name> <number>"
  );
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// using phoneNumber instead of number for consistency with my front-end app build
const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Person = mongoose.model("Person", personSchema);

const exitWithoutError = () => {
  mongoose.connection.close();
  process.exit(0);
};

const exitWithError = (reason) => {
  console.error(`Error: ${reason}`);
  process.exit(1);
};

if (process.argv.length === 2) {
  Person.find({})
    .then((result) => {
      if (result.length === 0) {
        console.log("Phonebook is empty");
      } else {
        console.log("Phonebook:");
        result.forEach((person) =>
          console.log(`${person.name} ${person.phoneNumber}`)
        );
      }
      exitWithoutError();
    })
    .catch((reason) => {
      exitWithError(reason);
    });
} else if (process.argv.length === 4) {
  const newPerson = new Person({
    name: process.argv[2],
    phoneNumber: process.argv[3],
  });
  newPerson
    .save()
    .then((result) => {
      console.log(
        `Added ${result.name} number ${result.phoneNumber} to phonebook`
      );
      exitWithoutError();
    })
    .catch((reason) => {
      exitWithError(reason);
    });
} else {
  // should never get here, but error handling in case
  exitWithError("Error parsing supplied arguments, exiting");
}

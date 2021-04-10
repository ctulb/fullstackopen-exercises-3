const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

if (!process.env.MONGODB_CONNECTION_STRING) {
  console.error('MongoDB connection string could not be configured');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log('Connected to database');
  })
  .catch((reason) => {
    console.error(`Could not connect to database: ${reason}`);
    process.exit(1);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

module.exports = mongoose.model('Person', personSchema);

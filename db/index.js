const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:abc123@ds259820.mlab.com:59820/lululemonades-you-may');

const db = mongoose.connection;

db.once('open', (err) => {
  if (err) {
    console.log('There was an error connecting to database');
  } else {
    console.log('You are connected');
  }
});

const relatedSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  main: String,
  hover: String,
  price: String,
  color: Array
});

const RelatedItems = mongoose.model('Related', relatedSchema);

module.exports = {
  RelatedItems
};

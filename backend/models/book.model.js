const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true},
  title: { type: String, required: true },
  dateStarted: { type: Date, required: true },
  dateFinished: { type: Date, required: true },
  rating: {type: Number, required: true}
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);


module.exports = Book;
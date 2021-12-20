const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const dateStarted = Date.parse(req.body.dateStarted);
  const dateFinished = Date.parse(req.body.dateFinished);
  const rating = req.body.rating;

  const newBook = new Book({
    username,
    title,
    description,
    dateStarted,
    dateFinished,
    rating
  });

  newBook.save()
  .then(() => res.json('Book added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
      .then(book => res.json(book))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Book.findByIdAndDelete(req.params.id)
      .then(() => res.json('Book deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Book.findById(req.params.id)
      .then(book => {
        book.username = req.body.username;
        book.title = req.body.title;
        book.description = req.body.description;
        book.dateStarted = Date.parse(req.body.dateStarted);
        book.dateFinished = Date.parse(req.body.dateFinished);
        book.rating = req.body.rating;
  
        book.save()
          .then(() => res.json('Book updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
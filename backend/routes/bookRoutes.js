const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post('/', async (req, res) => {
  const { title, author, description, publishedDate } = req.body;
  const book = new Book({ title, author, description, publishedDate });
  await book.save();
  res.status(201).json(book);
});

router.put('/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
}); 

router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});


module.exports = router;
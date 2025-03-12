const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { check, validationResult } = require('express-validator');
const { verifyToken } = require('../authentication/auth');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', verifyToken, [
    check('title').notEmpty().withMessage('Title is required'),
    check('author').notEmpty().withMessage('Author is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, author, description, publishedDate } = req.body;
        const book = new Book({ title, author, description, publishedDate });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
});


module.exports = router;
const express = require('express');
const { check, validationResult } = require('express-validator');
const Book = require('../models/Book');
const { verifyToken } = require('../authentication/auth');
const router = express.Router();
const redisClient = require('../cache/redisClient');

router.get('/', async (req, res) => {
    try {
        const cachedBooks = await redisClient.get('books');
        if (cachedBooks) {
            return res.json(JSON.parse(cachedBooks));
        }
        const books = await Book.find();
        await redisClient.set('books', JSON.stringify(books), {EX: 3600});
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
        redisClient.del('books');
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
        redisClient.del('books');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
    redisClient.del('books');
});

router.get('/:id', async (req, res) => {
    try {
        const cachedBook = await redisClient.get(`book:${req.params.id}`);
        if (cachedBook) {
            return res.json(JSON.parse(cachedBook));
        }
        const book = await Book.findById(req.params.id);
        await redisClient.set(`book:${req.params.id}`, JSON.stringify(book), {EX: 3600});
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;

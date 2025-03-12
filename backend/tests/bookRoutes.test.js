const request = require('supertest');
const app = require('../index');
const Book = require('../models/Book');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const MONGODB_PORT = 3000;

describe('Book API', () => {

    let server;
    let mongod;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const mongoUri = mongod.getUri();
        await mongoose.connect(mongoUri);
        server = app.listen(MONGODB_PORT);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
        server.close();
    });

    it('should get all books', async () => {
        const res = await request(app).get('/api/books');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should create a book', async () => {
        const res = await request(app).post('/api/books').send({
            title: 'Test Book',
            author: 'Test Author',
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test Book');
        expect(res.body.author).toBe('Test Author');
    });

    it('should update a book', async () => {
        const res = await request(app).put('/api/books/1').send({
            title: 'Updated Book',
            author: 'Updated Author',
        });
    });

    it('should delete a book', async () => {
        const book = new Book({
            title: 'Test Book',
            author: 'Test Author',
        });
        await book.save();
        const res = await request(app).delete(`/api/books/${book._id}`);
        expect(res.statusCode).toBe(204);
    });

    it('should handle validation errors', async () => {
        const res = await request(app).post('/api/books').send({
            title: '',
            author: '',
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

});

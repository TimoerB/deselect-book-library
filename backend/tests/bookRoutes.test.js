const request = require('supertest');
const app = require('../index');
const Book = require('../models/Book');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const MONGODB_PORT = 3000;

jest.mock('../cache/redisClient', () => {
    const Redis = require('ioredis-mock');
    const redis = new Redis();
    return {
        _esModule: true,
        default: redis,
        get: redis.get.bind(redis),
        set: redis.set.bind(redis),
        del: redis.del.bind(redis),
    };
});

describe('Book API', () => {

    let server;
    let mongod;
    let token;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const mongoUri = mongod.getUri();
        await mongoose.connect(mongoUri);
        server = app.listen(MONGODB_PORT);

        const uniqueEmail = `someone${Math.random()}@me.com`;
        const registerResponse = await request(app).post('/api/auth/register').send({
            username: uniqueEmail,
            email: uniqueEmail,
            password: 'Password123'
        });
        token = registerResponse.body.token;
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
        const res = await request(app).post('/api/books')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Book',
                author: 'Test Author',
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test Book');
        expect(res.body.author).toBe('Test Author');
    });

    it('should not create a book without authorization', async () => {
        const res = await request(app).post('/api/books')
            .send({
                title: 'Test Book',
                author: 'Test Author',
            });
        expect(res.statusCode).toBe(403);
    });

    it('should not update a book without authorization', async () => {
        const res = await request(app).put('/api/books/1')
            .send({
                title: 'Updated Book',
                author: 'Updated Author',
            });
        expect(res.statusCode).toBe(403);
    });

    it('should update a book', async () => {
        const res = await request(app).put('/api/books/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
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
        const res = await request(app)
            .delete(`/api/books/${book._id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });

    it('should not delete a book without authorization', async () => {
        const res = await request(app).delete('/api/books/1');
        expect(res.statusCode).toBe(403);
    });

    it('should handle validation errors', async () => {
        const res = await request(app).post('/api/books')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: '',
                author: '',
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

});

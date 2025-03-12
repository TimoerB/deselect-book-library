const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.error('Redis client error', err);
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;
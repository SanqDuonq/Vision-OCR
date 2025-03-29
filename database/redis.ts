import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redis = new Redis({
    host: process.env.REDIS_URL!,
    port: 11023,
    username: 'default',
    password: process.env.REDIS_PASS,
    retryStrategy: (times) => Math.min(times * 50, 2000)
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis Error:', err);
});

export default redis;

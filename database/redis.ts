import Redis from 'ioredis';

const redis = new Redis({
    host: 'redis-11023.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com',
    port: 11023,
    username: 'default',
    password: '1oHMXOpuMyAA9iYscXSvPRFs16FBunrK',
    retryStrategy: (times) => Math.min(times * 50, 2000)
});

redis.on('connect', () => {
    console.log('✅ Connected to Redis');
});

redis.on('error', (err) => {
    console.error('❌ Redis Error:', err);
});

export default redis;

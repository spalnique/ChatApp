import Redis from 'ioredis';
import { RedisStore } from 'connect-redis';

import env from './helper/env';

import { ENV } from './constant/index';

const redis_url = env(ENV.REDIS_URL);
const client = new Redis(redis_url);

client.on('connecting', () => console.log('Connecting to Redis...'));
client.on('connect', () => console.log('Connected to Redis!'));
client.on('close', () => console.log('Disconnected from Redis!'));
client.on('reconnecting', () => console.log('Reconnecting to Redis...'));
client.on('error', (err) => console.error('Redis error:', err));

export default new RedisStore({
  client,
  prefix: '',
  disableTouch: true,
});

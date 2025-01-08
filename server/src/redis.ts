import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

import { ENV_VARS } from '@constants';
import { env } from '@helpers';

const redis_url = env(ENV_VARS.REDIS_URL);
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

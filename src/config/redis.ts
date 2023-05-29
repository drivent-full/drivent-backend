import { createClient } from 'redis';

async function connectRedis() {
  const redisClient = createClient({
    socket: {
      host: 'redis',
      port: 6379,
    },
    password: process.env.REDIS_PASSWORD,
  });
  await redisClient.connect();

  return redisClient;
}

export default connectRedis;

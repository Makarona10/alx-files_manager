import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.connected = true;
    this.client.on('error', (err) => {
      console.log(err.toString());
      this.connected = false;
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(k) {
    return promisify(this.client.GET).bind(this.client)(k);
  }

  async set(k, val, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(k, duration, val);
  }

  async del(k) {
    await promisify(this.client.DEL).bind(this.client)(k);
  }
}

export const redisClient = new RedisClient();
export default redisClient;

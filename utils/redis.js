import { createClient } from 'redis';

class ReddisClient {
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
    return this.client.GET(k);
  }

  async set(k, val, duration) {
    this.client.SETEX(k, duration, val);
  }

  async del(k) {
    this.client.DEL(k);
  }
}

module.exports = ReddisClient;

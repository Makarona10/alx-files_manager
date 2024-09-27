import MongoClient from 'mongodb/lib/mongo_client';

class DBClient {
  constructor() {
    const HOST = process.env.DB_HOST || 'localhost';
    const PORT = process.env.DB_PORT || '27017';
    const DB = process.env.DB_DATABASE || 'files_manager';
    const URL = `mongodb://${HOST}:${PORT}/${DB}`;
    this.client = new MongoClient(URL);
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

export const dbClient = new DBClient();
export default dbClient;

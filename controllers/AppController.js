import DBClient from '../utils/db';
import RedisClient from '../utils/redis';

export default class AppController {
  static getStatus(_, res) {
    const redisStat = RedisClient.isAlive();
    const dbStat = DBClient.isAlive();
    return res.status(200).json({ redis: redisStat, db: dbStat });
  }

  static async getStats(_, res) {
    const files = await DBClient.nbFiles();
    const users = await DBClient.nbUsers();
    return res.status(200).json({ users, files });
  }
}

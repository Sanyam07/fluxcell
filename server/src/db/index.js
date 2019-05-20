import 'dotenv/config';
import { log } from '../utils/logger';
import { initDB } from './initDB';

class DB {
  init() {
    try {
      initDB();
    } catch (err) {
      log('database login failed', err);
    }
  }
}

export default DB;

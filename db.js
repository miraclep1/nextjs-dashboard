// import { MongoClient } from 'mongodb';
const { MongoClient } = require('mongodb');

class DBClient {
  #mongoUri;
  #dbName;
  #db;

  constructor(mongoUri, dbName) {
    this.#mongoUri = mongoUri;
    this.#dbName = dbName;
  }

  async getDb() {
    try {
      if (!this.#db) {
        const client = await MongoClient.connect(this.#mongoUri);
        this.#db = await client.db(this.#dbName);
        console.log('connected to db');
      }
      
      return this.#db;
    } catch (error) {
      const message = 'Error connecting to mongo';

      // interpolation
      error.message = `${message}! ${error.message}`;
      console.log(error);
    }
  }
}

// calling new client
const client = new DBClient ("mongodb://localhost:27017/", "cars");

// immediately invoked function expression (IIFE)
(async () => {
  const db = await client.getDb();
  const db2 = await client.getDb();
  console.log(db === db2);
})()
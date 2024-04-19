'use server';
let dbInstance = null;
export default async function connectToDatabase() {
  const { MongoClient } = require('mongodb');
  console.log('conectarse a la base de datos');
  if (!dbInstance) {
    const apiUser = process.env.NEXT_PUBLIC_USERNAME;
    const apiKey = process.env.NEXT_PUBLIC_KEY;
    const clusterName = process.env.NEXT_PUBLIC_NAMESERVICE;
    const dbName = process.env.NEXT_PUBLIC_DB;
    const urlconnect =
      'mongodb+srv://' +
      apiUser +
      ':' +
      apiKey +
      '@' +
      clusterName +
      '/' +
      dbName +
      '?retryWrites=true&w=majority&appName=Cluster0';
    try {
      const client = await MongoClient.connect(urlconnect);
      dbInstance = client.db();
      //const meetupsCollection = db.collection('meetups');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  return dbInstance;
}

//module.exports = { connectToDatabase };

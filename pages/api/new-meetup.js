import { MongoClient } from 'mongodb';
// /api/new-meetup
// POST /api/new-meetup
async function handler(req, res) {
  if ((req.method = 'POST')) {
    const data = req.body;
    // const { title, image, address, description } = data;
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
    const client = await MongoClient.connect(urlconnect);
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}
export default handler;

import { MongoClient } from 'mongodb';
// /api/new-meetup
// POST /api/new-meetup
async function handler(req, res) {
  if ((req.method = 'POST')) {
    const data = req.body;
    // const { title, image, address, description } = data;
    const urlconnect =
      'mongodb+srv://anthony:C3vOQqoV0P8Rf44E@cluster0.xotg4ou.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0';
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

import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';
import Head from 'next/head';
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

//fetch data from an API
export async function getStaticProps() {
  console.log('pre-rendering data ');
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
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 10,
  };
}
export default HomePage;

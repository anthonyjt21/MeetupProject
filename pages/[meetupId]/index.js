import { MongoClient, ObjectId } from 'mongodb';

import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

import Head from 'next/head';

// import  connectToDatabase  from '../util/help-connection';
//const connectToDatabase = require('../db/mongoConnection');

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      ></MeetupDetail>
    </Fragment>
  );
}
export async function getStaticPaths() {
  // let db = null;
  // try {
  //   db = await connectToDatabase();
  //   // Use db connection for database operations
  // } catch (error) {
  //   console.error('Error connectToDatabase:', error);
  // }

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

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  console.log('meetups');
  console.log(meetups);
  const listpaths = meetups.map((meetup) => ({
    params: {
      meetupId: meetup._id.toString(),
    },
  }));
  console.log(listpaths);
  return {
    fallback: false,
    paths: listpaths,
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
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
  const objectIdFromTime = ObjectId.createFromHexString(meetupId);
  const selectedMeetup = await meetupsCollection.findOne({
    _id: objectIdFromTime,
  });
  console.log('objectIdFromTime');
  console.log(objectIdFromTime);
  console.log(selectedMeetup);
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;

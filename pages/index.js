// import { useEffect, useState } from 'react'
import { MongoClient } from 'mongodb'
import { Fragment } from 'react'
import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'

function HomePage(props) {
  //   const [loadedMeetups,setLoadedMeetups]= useState([])
  //   useEffect(()=>{
  // //send http request and fetch data
  // setLoadedMeetups(DUMMY_MEETUPS)
  //   },[])
  return (
    <Fragment>
      <Head>
        <title>React Meetups NextJS</title>
        <meta
          name="description"
          browse="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}
//----------- STATIC SIDE GENERATION ----FASTER-------
export async function getStaticProps() {
  //fetch data from an API:
  const client = await MongoClient.connect(
    'mongodb+srv://Dalton:2204981492007@cluster0.slag6.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find().toArray()
  client.close()

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, //renegerate(regular update) every 5 seconds ,this is ffor webs ites where are changing many informations in a short time.....
  }
}

// //---------- SERVER SIDE RENDERING---------
// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res
//   //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   }
// }
export default HomePage

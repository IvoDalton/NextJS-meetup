//  /api/new-meetup
// POST request==> /api/new-meetup

import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const { title, image, address, description } = data

    const client = await MongoClient.connect(
      'mongodb+srv://Dalton:2204981492007@cluster0.slag6.mongodb.net/meetups?retryWrites=true&w=majority'
    )
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const result = await meetupsCollection.insertOne(data)

    client.close()
    res.status(201).json({ message: 'Meetup inserted!' })
  }
}
export default handler

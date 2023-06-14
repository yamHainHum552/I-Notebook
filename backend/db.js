import mongoose from 'mongoose'

const URI = 'mongodb://127.0.0.1:27017/inotebooks'

const connectToMongo = () => {
  mongoose
    .connect(URI, { dbName: 'inotebooks' })
    .then(() => console.log('Connected Successfully'))
    .catch(() => console.log('error'))
}
export default connectToMongo

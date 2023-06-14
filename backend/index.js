import connectToMongo from './db.js'
import express from 'express'
import auth from './routes/auth.js'
import notes from './routes/notes.js'
import cors from 'cors'

const app = express()
app.use(cors())
connectToMongo()

// using middlewares
app.use(express.json())

// Available Routes
app.use('/api/auth', auth)
app.use('/api/notes', notes)

app.listen(5000, () => {
  console.log('Server Running')
})

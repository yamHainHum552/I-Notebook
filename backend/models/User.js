import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
})
const user = mongoose.model('user', userSchema)
export default user

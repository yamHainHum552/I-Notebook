import express from 'express'
import fetchUser from '../middleware/fetchUser.js'
import notes from '../models/Notes.js'
import {body,validationResult } from 'express-validator'

const router = express.Router()

// Route 1: Get all the notes using get /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const user_notes = await notes.find({ user: req.user.id })
    res.json(user_notes)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal server error')
  }
})
// Route 2: Add a new Note using Post /api/notes/addnote
router.post(
  '/addnote',
  fetchUser,
  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // If errors, send bad req
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { title, description, tag, date } = req.body
      const note = await notes.create({
        title,
        description,
        tag,
        date,
        user: req.user.id,
      })
      console.log(note)
      res.json(note)
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Internal server error')
    }
  },
)
// Route: 3, Update an existing note: Post api/notes/updatenote

router.put('/updatenote/:id', fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body
    // Create new note object

    const newNote = {}
    if (title) {
      newNote.title = title
    }
    if (description) {
      newNote.description = description
    }
    if (tag) {
      newNote.tag = tag
    }

    // Find the note to be updated
    let note = await notes.findById(req.params.id)
    if (!note) {
      return res.status(404).send('Not Found')
    }
    // Checking whether the note  belongs to the same user who is logged in
    if (note.user.toString() !== req.user.id)
      return res.status(401).send('Not Allowed')
    note = await notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true },
    )
    res.json({ note })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal server error')
  }
})
// Route:3 Deleting an existing note using Delete api/notes/deletenote

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await notes.findById(req.params.id)
    if (!note) {
      return res.status(404).send('Not Found')
    }
    // Checking whether the note  belongs to the same user who is logged in
    if (note.user.toString() !== req.user.id)
      return res.status(401).send('Not Allowed')
    note = await notes.findByIdAndDelete(req.params.id)
    res.json({ Success: 'Your note has been deleted' })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal server error')
  }
})

export default router

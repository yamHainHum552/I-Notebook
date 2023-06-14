import React, { useState } from 'react'
import NoteContext from './NoteContext'
// import { useContext } from "react";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

  // Get all notes
  const getAllNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`

    const response = await fetch(url, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authentication: localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`
    const data = { title, description, tag }

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        Authentication: localStorage.getItem('token'),
      },

      body: JSON.stringify(data),
    })
    const json = await response.json()

    const note = json
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`

    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        Authentication: localStorage.getItem('token'),
      },

      // body: JSON.stringify(data),
    })

    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const data = { title, description, tag }
    // Api call
    const url = `${host}/api/notes/updatenote/${id}`

    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        Authentication: localStorage.getItem('token'),
      },

      body: JSON.stringify(data),
    })
    const json = await response.json()
    // console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < notes.length; i++) {
      const element = newNotes[i]
      if (element._id === id) {
        element.title = title
        element.description = description
        break
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState

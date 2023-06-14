import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
  const context = useContext(noteContext)
  const { deleteNote } = context
  const { notes, updateNote } = props

  const handleDelete = () => {
    deleteNote(notes._id)
  }

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text">{notes.description}</p>
          <i className="fa-solid fa-trash mx-2" onClick={handleDelete}></i>
          <i
            className="fa-solid fa-file-pen mx-2"
            onClick={() => {
              updateNote(notes)
            }}
          ></i>
        </div>
      </div>
    </div>
  )
}

export default NoteItem

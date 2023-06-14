import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNotes = (props) => {
  const { showAlert } = props
  const context = useContext(noteContext)
  const { addNote } = context
  const [note, setNote] = useState({ title: '', description: '', tag: '' })
  const handleAdd = (e) => {
    e.preventDefault()

    addNote(note.title, note.description, note.tag)
    setNote({ title: '', description: '', tag: '' })
    showAlert('Your note has been added', 'success')
  }
  const onchange = (e) => {
    e.preventDefault()

    setNote({
      ...note,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div>
      <div className="container my-3">
        <h1>Add a note</h1>

        <form>
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="title"
              name="title"
              onChange={onchange}
              required
              minLength={5}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              onChange={onchange}
              name="description"
              required
              minLength={5}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              onChange={onchange}
              name="tag"
              value={note.tag}
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleAdd}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNotes

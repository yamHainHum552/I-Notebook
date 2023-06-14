import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const { showAlert } = props
  const context = useContext(noteContext)
  const ref = useRef(null)
  const refClose = useRef(null)
  const navigate = useNavigate()

  const { notes, getAllNotes, addNote, editNote } = context
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes()
    } else {
      navigate('/login')
    }
  }, [])

  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: '',
  })
  const handleAdd = (e) => {
    // e.preventDefault()
    refClose.current.click()
    editNote(note.id, note.etitle, note.edescription, note.etag)
    showAlert('Your note has been updated', 'success')
  }
  const onchange = (e) => {
    e.preventDefault()

    setNote({
      ...note,
      [e.target.name]: e.target.value,
    })
  }
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    })
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="eTitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      aria-describedby="etitle"
                      name="etitle"
                      onChange={onchange}
                      value={note.etitle}
                      required
                      minLength={3}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="etext"
                      className="form-control"
                      id="edescription"
                      onChange={onchange}
                      name="edescription"
                      value={note.edescription}
                      minLength={5}
                      required
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
                      value={note.etag}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleAdd}
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your notes</h1>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} notes={note} />
          )
        })}
      </div>
    </>
  )
}
export default Notes

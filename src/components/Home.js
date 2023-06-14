import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import Notes from './Notes'
import AddNotes from './AddNotes'

const Home = (props) => {
  const { showAlert } = props
  return (
    <div>
      <AddNotes showAlert={showAlert} />
      <Notes showAlert={showAlert} />
    </div>
  )
}

export default Home

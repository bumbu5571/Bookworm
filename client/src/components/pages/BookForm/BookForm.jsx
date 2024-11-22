import React from 'react'
import style from "./BookForm.module.css"
import CreateForm from '../../block/CreateForm/CreateForm'

function BookForm({user}) {
  return (
      <>
      <CreateForm user={user} />
      </>
  )
}

export default BookForm
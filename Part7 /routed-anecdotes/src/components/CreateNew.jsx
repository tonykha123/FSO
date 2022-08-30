import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = ({ addNew, setNotification, notification }) => {
  const navigate = useNavigate()
  //the usefield hook returns four values, the type, onchange, and value
  //since the form only uses 3, we can simply take the reset out into its own variable
  //and spread the rest into the respective fields we need.
  //So spread takes the remaining props and puts them into own values
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    }
    addNew(newAnecdote)
    setNotification(`a new anecdote :${newAnecdote.content} created!`)
    navigate('/')
    setTimeout(() => setNotification(''), 5000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}> reset</button>
      </form>
    </div>
  )
}

export default CreateNew

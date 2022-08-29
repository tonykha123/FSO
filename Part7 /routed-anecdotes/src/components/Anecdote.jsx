import React from 'react'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h3>{anecdote.content}</h3>
      <h4>by {anecdote.author}</h4>
      <h4> votes {anecdote.votes}</h4>
      <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  )
}

export default Anecdote

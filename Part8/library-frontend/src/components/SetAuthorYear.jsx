import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AGE, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const SetAuthorYear = ({ authors }) => {
  const [authorName, setAuthorName] = useState('')
  const [authorBorn, setAuthorBorn] = useState('')

  const [editAuthorAgeMutation] = useMutation(EDIT_AGE, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    editAuthorAgeMutation({
      variables: { name: authorName, setBornTo: authorBorn },
    })

    setAuthorName('')
    setAuthorBorn('')
  }

  console.log(authors)
  return (
    <div>
      <h2>Edit Author's Year Born</h2>
      <form>
        <div>
          Author Name
          <select
            defaultValue={authors[0].name}
            onChange={(e) => setAuthorName(e.target.value)}
          >
            {authors.map((a) => {
              return <option value={a.name}>{a.name}</option>
            })}
          </select>
        </div>
        <div>
          Author's Year Born:
          <input
            type="number"
            value={authorBorn}
            onChange={(e) => setAuthorBorn(Number(e.target.value))}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Update Age
        </button>
      </form>
    </div>
  )
}

export default SetAuthorYear

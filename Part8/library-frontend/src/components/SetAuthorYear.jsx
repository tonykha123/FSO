import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'

const SetAuthorYear = () => {
  const [authorName, setAuthorName] = useState('')
  const [authorBorn, setAuthorBorn] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setAuthorName('')
    setAuthorBorn('')
  }
  return (
    <div>
      <h2>Edit Author's Age</h2>
      <form>
        <div>
          Author Name
          <input type="text" />
        </div>
        <div>
          Author Age:
          <input type="number" />
        </div>
      </form>
    </div>
  )
}

export default SetAuthorYear

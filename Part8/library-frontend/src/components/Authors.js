import { useState } from 'react'
import SetAuthorYear from './SetAuthorYear'

const Authors = ({ show, authors }) => {
  const [showEdit, setShowEdit] = useState(false)

  if (!show) {
    return null
  }

  const showEditForm = showEdit ? <SetAuthorYear /> : null

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => setShowEdit(!showEdit)}>
          {showEdit ? 'Hide Form' : 'Edit Author Age'}
        </button>
        {showEditForm}
      </div>
    </div>
  )
}

export default Authors
